<script setup lang="ts">
defineProps<{
  value: {
    completed: boolean | null
  }
}>()

const emit = defineEmits<{
  (e: 'filter', { completed: boolean }): void
}>()

const handleClickAll = () => {
  emit('filter', { completed: null })
}

const handleClickActive = () => {
  emit('filter', { completed: false })
}

const handleClickCompleted = () => {
  emit('filter', { completed: true })
}
</script>

<template>
  <div class="tasks-list-filter">
    <input
      type="button"
      value="Все"
      :class="{ ['tasks-list-filter--active']: value.completed === null }"
      @click="handleClickAll"
    />
    <input
      type="button"
      value="Активные"
      :class="{ ['tasks-list-filter--active']: value.completed === false }"
      @click="handleClickActive"
    />
    <input
      type="button"
      value="Выполненные"
      :class="{ ['tasks-list-filter--active']: value.completed === true }"
      @click="handleClickCompleted"
    />
  </div>
</template>

<style scoped lang="scss">
.tasks-list-filter {
  padding: 8px 0 16px;
  display: flex;
  gap: 8px;

  &--active {
    background-color: aliceblue;
  }
}
</style>
