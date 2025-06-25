<script setup lang="ts">
import TasksList from '@/components/TasksList.vue'
import AddNewTask from '@/components/AddNewTask.vue'
import TasksListFilter from '@/components/TasksListFilter.vue'
import { tasksStore, type TasksFilter } from '@/store/tasks.ts'

tasksStore.dispatch('loadTasks')

const addTask = ({ title }) => {
  tasksStore.dispatch('add', {
    title,
    completed: false,
  })
}

const deleteTask = (e: { id: number }) => {
  if (confirm('Удалить задание?')) {
    tasksStore.commit('delete', e.id)
  }
}

const checkTask = (e: Task) => {
  tasksStore.commit('update', e)
}

const filterTasksList = (e: TasksFilter) => {
  tasksStore.commit('setFilter', e)
}
</script>

<template>
  <AddNewTask @add-click="addTask" />
  <TasksListFilter :value="tasksStore.state.filter" @filter="filterTasksList" />
  <TasksList :list="tasksStore.getters.tasksList" @delete-click="deleteTask" @check="checkTask" />
</template>

<style scoped lang="scss"></style>
