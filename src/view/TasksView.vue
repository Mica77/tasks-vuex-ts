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

const handleDeleteTask = (e: { id: number }) => {
  if (confirm('Удалить задание?')) {
    tasksStore.commit('delete', e.id)
  }
}

const handleUpdateTask = (e: Task) => {
  tasksStore.commit('update', e)
}

const handleFilterTasksList = (e: TasksFilter) => {
  tasksStore.commit('setFilter', e)
}
</script>

<template>
  <AddNewTask @add-click="addTask" :disabled="!tasksStore.state.loadComplete" />
  <TasksListFilter :value="tasksStore.state.filter" @filter="handleFilterTasksList" />
  <TasksList
    :list="tasksStore.getters.tasksList"
    @delete-click="handleDeleteTask"
    @change="handleUpdateTask"
  />
</template>

<style scoped lang="scss"></style>
