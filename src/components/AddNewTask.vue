<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'addClick', { title: string }): void
}>()

const title = ref<string>()

const handleClick = () => {
  if (title.value) {
    emit('addClick', { title: title.value })
    title.value = ''
  }
}
</script>

<template>
  <div class="add-new-task">
    <input class="add-new-task__text" type="text" v-model="title" />
    <button @click="handleClick">Удалить</button>
  </div>
</template>

<style scoped lang="scss">
.add-new-task {
  display: flex;
  gap: 8px;

  &__text {
    width: 50%;
  }
}
</style>
