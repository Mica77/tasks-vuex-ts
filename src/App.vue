<script setup lang="ts">
import TasksList from '@/components/TasksList.vue'
import AddNewTask from '@/components/AddNewTask.vue'
import TasksListFilter from '@/components/TasksListFilter.vue'
import { tasksStore, type TasksFilter } from '@/store/tasks.ts'

tasksStore.dispatch('get')

const addTask = ({ title }) => {
  tasksStore.dispatch('add', {
    title,
  })
}

const deleteTask = (e: { id: number }) => {
  if (confirm('Удлить задание?')) {
    tasksStore.commit('delete', e)
  }
}

const checkTask = (e: { id: number; checked: boolean }) => {
  tasksStore.commit('update', { id: e.id, completed: e.checked })
}

const filterTasksList = (e: TasksFilter) => {
  tasksStore.commit('setFilter', e)
}
</script>

<template>
  <AddNewTask @addClick="addTask" />
  <TasksListFilter :value="tasksStore.state.filter" @filter="filterTasksList" />
  <TasksList :list="tasksStore.getters.tasksList" @deleteClick="deleteTask" @check="checkTask" />
</template>

<style>
input {
  padding: 4px;
}
</style>
