import { v4 as uuidv4 } from 'uuid'
import type { Task } from '../types'

export let apiDelay = 400

function setApiDelay(delay: number) {
  apiDelay = delay
}

let tasks: Task[] = [
  { id: uuidv4(), title: 'Откликнуться на вакансию', complited: true },
  { id: uuidv4(), title: 'Получить задание', complited: true },
  { id: uuidv4(), title: 'Сделать задание', complited: true },
  { id: uuidv4(), title: 'Получить ответ', complited: false },
]

function fetchTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...tasks]), apiDelay)
  })
}

function addTask(title: string): Promise<Task> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask: Task = { id: uuidv4(), title, complited: false }
      tasks.push(newTask)
      resolve(newTask)
    }, apiDelay)
  })
}

function deleteTask(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = tasks.findIndex((t) => t.id === id)
      if (idx !== -1) {
        tasks.splice(idx, 1)
        resolve()
      } else {
        reject(new Error('Task not found'))
      }
    }, apiDelay)
  })
}

function updateTask(task: Task): Promise<Task> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = tasks.findIndex((t) => t.id === task.id)
      if (idx !== -1) {
        tasks[idx] = { ...task }
        resolve(tasks[idx])
      } else {
        reject(new Error('Task not found'))
      }
    }, apiDelay)
  })
}

export const taskApi = {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
  setApiDelay,
}
