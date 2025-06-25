import { createStore } from 'vuex'
import type { Task } from '@/types'
import { loadTasks } from '@/api/tasks'

export type TasksFilter = {
  completed: boolean | null
}

type TasksState = {
  tasks: Task[]
  filter: TasksFilter
  loadComplete: boolean
}

export const tasksStore = createStore({
  state: () =>
    <TasksState>{
      tasks: [],
      filter: { completed: null },
      loadComplete: false,
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
      state.loadComplete = true
    },
    addTask(state, value: Task) {
      state.tasks.push(value)
    },
    delete(state, id: Task['id']) {
      state.tasks = state.tasks.filter((taskItem) => taskItem.id !== id)
    },
    update(state, value: Task) {
      const task = state.tasks.find((taskItem) => taskItem.id === value.id)
      if (task) {
        task.title = value.title
        task.completed = value.completed
      }
    },
    setFilter(state, value: TasksFilter) {
      state.filter = value
    },
  },
  actions: {
    async loadTasks({ commit }) {
      this.state.loadComplete = false
      const tasks = await loadTasks()
      commit('setTasks', tasks)
    },
    add({ state, commit }, value: Omit<Task, 'id'>) {
      const id = Math.max(...state.tasks.map((taskItem) => taskItem.id)) + 1
      const newTask = <Task>{
        id,
        ...value,
      }
      commit('addTask', newTask)
    },
  },
})
