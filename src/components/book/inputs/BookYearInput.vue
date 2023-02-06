<template>
  <div>
    <label
      for="book-year"
      class="form-label"
    >
      Published Year
    </label>
    <PatternInput
      class="form-control"
      format="####"
      pattern="\d{4}"
      v-model.number="value"
      :disabled="props.disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

import PatternInput from '@/components/widgets/PatternInput.vue'

const props = defineProps<{
  modelValue?: number,
  disabled: boolean,
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value?: number): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value?: number) => {
    emit(`update:modelValue`, value)
  }
})
</script>

<style lang="scss" scoped>
</style>
