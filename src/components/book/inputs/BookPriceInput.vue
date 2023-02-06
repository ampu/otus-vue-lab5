<template>
  <div>
    <label
      for="book-price"
      class="form-label"
    >
      Price
    </label>
    <CurrencyInput
      id="book-price"
      class="form-control text-end"
      v-model="value"
      :disabled="props.disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

import CurrencyInput from '@/components/widgets/CurrencyInput.vue'

const PRICE_FRACTION_DIGITS = 2

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
    const price = Number(value?.toFixed(PRICE_FRACTION_DIGITS))
    emit(`update:modelValue`, Number.isFinite(price) ? Math.abs(price) : undefined)
  }
})
</script>

<style lang="scss" scoped>
</style>
