<script setup lang="ts">
import TasksListItem from './TasksListItem.vue'

defineProps<{
  list: Task[]
}>()

const emit = defineEmits<{
  (e: 'deleteClick', { id: number }): void
  (e: 'change', Task): void
}>()

const handleDeleteClick = (e: { id: task.id }) => {
  emit('deleteClick', e)
}

const handleCheckClick = (task, e: { checked: boolean }) => {
  emit('change', { ...task, checked: e.checked })
}
</script>

<template>
  <div class="tasks-list">
    <TasksListItem
      v-for="task in list"
      :task="task"
      :key="task.id"
      @delete-click="handleDeleteClick({ id: task.id })"
      @check="handleCheckClick(task, $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.tasks-list {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}
</style>
