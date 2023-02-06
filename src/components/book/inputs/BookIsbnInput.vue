<template>
  <div>
    <label
      for="book-isbn"
      class="form-label"
    >
      ISBN
    </label>
    <PatternInput
      class="form-control"
      format="###-#-####-####-#"
      pattern="\d{3}-\d-\d{4}-\d{4}-\d"
      v-model="value"
      :disabled="props.disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

import PatternInput from '@/components/widgets/PatternInput.vue'

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
