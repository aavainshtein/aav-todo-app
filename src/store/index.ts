import { createStore } from 'vuex'
import { taskApi } from '../api/taskApi'
import type { Task } from '../types'
import { v4 as uuidv4 } from 'uuid'

export type FilterType = 'all' | 'active' | 'completed'

interface State {
  tasks: Task[]
  currentFilter: FilterType
  isLoading: boolean
  apiDelay: number
}

const state: State = {
  tasks: [],
  currentFilter: 'all',
  isLoading: false,
  apiDelay: 400,
}

const mutations = {
  SET_TASKS(state: State, tasks: Task[]) {
    state.tasks = tasks
  },
  ADD_TASK(state: State, task: Task) {
    state.tasks.push(task)
  },
  REMOVE_TASK(state: State, id: string) {
    state.tasks = state.tasks.filter(t => t.id !== id)
  },
  UPDATE_TASK(state: State, task: Task) {
    const idx = state.tasks.findIndex(t => t.id === task.id)
    if (idx !== -1) state.tasks[idx] = { ...task }
  },
  SET_FILTER(state: State, filter: FilterType) {
    state.currentFilter = filter
  },
  SET_LOADING(state: State, isLoading: boolean) {
    state.isLoading = isLoading
  },
  SET_API_DELAY(state: State, delay: number) {
    state.apiDelay = delay
  },
}

const getters = {
  allTasks: (state: State) => state.tasks,
  activeTasks: (state: State) => state.tasks.filter(t => !t.complited),
  completedTasks: (state: State) => state.tasks.filter(t => t.complited),
  filteredTasks: (state: State) => {
    if (state.currentFilter === 'active') return state.tasks.filter(t => !t.complited)
    if (state.currentFilter === 'completed') return state.tasks.filter(t => t.complited)
    return state.tasks
  },
  isLoading: (state: State) => state.isLoading,
  apiDelay: (state: State) => state.apiDelay,
}

const actions = {
  async fetchTasks({ commit, dispatch }: any) {
    dispatch('setLoading', true)
    const tasks = await taskApi.fetchTasks()
    commit('SET_TASKS', tasks)
    dispatch('setLoading', false)
  },
  async addTask({ commit, dispatch }: any, title: string) {
    const tempId = uuidv4()
    const tempTask: Task = { id: tempId, title, complited: false }
    commit('ADD_TASK', tempTask)
    dispatch('setLoading', true)
    try {
      const realTask = await taskApi.addTask(title)
      commit('REMOVE_TASK', tempId)
      commit('ADD_TASK', realTask)
    } finally {
      dispatch('setLoading', false)
    }
  },
  async deleteTask({ commit, dispatch }: any, id: string) {
    commit('REMOVE_TASK', id)
    dispatch('setLoading', true)
    try {
      await taskApi.deleteTask(id)
    } finally {
      dispatch('setLoading', false)
    }
  },
  async toggleTaskStatus({ commit, dispatch, state }: any, id: string) {
    const task = state.tasks.find((t: Task) => t.id === id)
    if (!task) return
    const updated = { ...task, complited: !task.complited }
    commit('UPDATE_TASK', updated)
    dispatch('setLoading', true)
    try {
      await taskApi.updateTask(updated)
    } finally {
      dispatch('setLoading', false)
    }
  },
  setFilter({ commit }: any, filter: FilterType) {
    commit('SET_FILTER', filter)
  },
  setLoading({ commit }: any, isLoading: boolean) {
    commit('SET_LOADING', isLoading)
  },
  setApiDelay({ commit }: any, delay: number) {
    commit('SET_API_DELAY', delay)
    taskApi.setApiDelay(delay)
  },
}

const store = createStore({
  state,
  mutations,
  actions,
  getters,
})

export default store
