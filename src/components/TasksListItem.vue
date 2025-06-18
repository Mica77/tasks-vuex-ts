<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'deleteClick'): void
  (e: 'check', { checked: boolean }): void
}>()

const deleteClick = () => {
  emit('deleteClick')
}

const checkClick = () => {
  emit('check', { checked: !checked.value })
}

const checked = ref<boolean>(props.task.completed)

watchEffect(() => {
  checked.value = props.task.completed
})
</script>

<template>
  <div class="tasks-list-item">
    <div>
      <input :id="`check${task.id}`" type="checkbox" @click="checkClick" v-model="checked" />
      <label :for="`check${task.id}`">{{ task.title }}</label>
    </div>
    <input class="delete-task-button" type="button" value="Удалить" @click="deleteClick" />
  </div>
</template>

<style scoped lang="scss">
.tasks-list-item {
  padding: 2px 0;
  display: flex;
  justify-content: space-between;
}
</style>
