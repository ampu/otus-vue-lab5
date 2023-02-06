<template>
  <NumericFormat
    :className="props.class"
    suffix=" ₽"
    :decimalScale="2"
    :fixedDecimalScale="true"
    decimalSeparator="."
    thousandSeparator=" "
    placeholder=" ₽"
    :disabled="disabled"
    :value="props.modelValue"
    :onValueChange="onChange"
  />
</template>

<script lang="ts" setup>
import {NumericFormat as ReactNumericFormat} from 'react-number-format'
import {applyReactInVue} from 'veaury'

const NumericFormat = applyReactInVue(ReactNumericFormat)

const props = defineProps<{
  class: string,
  modelValue?: number,
  disabled?: boolean,
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value?: number): void,
}>()

const onChange = (values: { formattedValue: string, value: string, floatValue?: number }) => {
  emit(`update:modelValue`, values.floatValue)
}
</script>

<style lang="scss" scoped>

</style>
