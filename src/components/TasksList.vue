<script setup lang="ts">
import TasksListItem from './TasksListItem.vue'

defineProps<{
  list: Task[]
}>()

const emit = defineEmits<{
  (e: 'deleteClick', { id: number }): void
  (e: 'check', { id: number, checked: boolean }): void
}>()

const deleteClick = (e: { id: task.id }) => {
  emit('deleteClick', e)
}

const checkClick = (e: { id: task.id; checked: boolean }) => {
  emit('check', e)
}
</script>

<template>
  <div class="tasks-list">
    <TasksListItem
      v-for="task in list"
      :task="task"
      :key="task.id"
      @deleteClick="deleteClick({ id: task.id })"
      @check="checkClick({ id: task.id, checked: $event.checked })"
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
