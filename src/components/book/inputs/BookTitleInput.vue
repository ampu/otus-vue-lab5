<template>
  <div>
    <label
      for="book-title"
      class="form-label"
    >
      Title
    </label>
    <input
      data-testid="book-title"
      type="text"
      id="book-title"
      class="form-control"
      required
      v-focus
      v-model.trim="value"
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
