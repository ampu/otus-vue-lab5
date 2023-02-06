<template>
  <div>
    <label
      for="book-tags"
      class="form-label"
    >
      Tags
    </label>
    <input
      type="text"
      id="book-tags"
      class="form-control"
      v-model="value"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

const props = defineProps<{
  modelValue?: string,
  disabled: boolean,
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value?: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value?: string) => {
    emit(`update:modelValue`, value)
  }
})
</script>

<style lang="scss" scoped>

</style>
