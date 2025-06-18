import { createStore } from 'vuex'
import type { Task } from '@/entities.d.ts'
import { loadTasks } from '@/api/tasks'

export type TasksFilter = {
  completed: boolean | null
}

type TasksState = {
  tasks: Task[]
  filter: TasksFilter
}

export const tasksStore = createStore({
  state: () =>
    <TasksState>{
      tasks: [],
      filter: { completed: null },
    },
  getters: {
    tasksList(state) {
      return state.tasks.filter(
        (taskItem) =>
          state.filter.completed === null || taskItem.completed === state.filter.completed,
      )
    },
  },
  mutations: {
    setTasks(state, value: Task[]) {
      state.tasks = value
    },
    addTask(state, value: Task) {
      state.tasks.push(value)
    },
    delete(state, value: { id: number }) {
      state.tasks = state.tasks.filter((taskItem) => taskItem.id !== value.id)
    },
    update(state, value: { id: number; completed: boolean }) {
      state.tasks.forEach((taskItem) => {
        if (taskItem.id === value.id) {
          taskItem.completed = value.completed
        }
      })
    },
    setFilter(state, value: TasksFilter) {
      state.filter = value
    },
  },
  actions: {
    async get({ commit }) {
      const tasks = await loadTasks()
      commit('setTasks', tasks)
    },
    add({ state, commit }, value: { title: string }) {
      const id = Math.max(...state.tasks.map((taskItem) => taskItem.id)) + 1
      const newTask = <Task>{
        id,
        title: value.title,
        completed: false,
      }
      commit('addTask', newTask)
    },
  },
})
