<template>
  <div>
    <label
      for="book-description"
      class="form-label"
    >
      Description
    </label>
    <textarea
      id="book-description"
      class="form-control"
      rows="4"
      v-model="value"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

const props = defineProps<{
  modelValue: string,
  disabled: boolean,
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit(`update:modelValue`, value)
  }
})
</script>

<style lang="scss" scoped>
</style>
