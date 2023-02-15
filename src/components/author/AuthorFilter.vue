<template>
  <tr>
    <th>
      <input
        class="form-control"
        v-model="name"
        :disabled="props.disabled"
      />
    </th>
    <th>
      <input
        class="form-control"
        v-model="country"
        :disabled="props.disabled"
      />
    </th>
    <th/>
  </tr>
</template>

<script lang="ts" setup>
import {AuthorFilterModel} from '@/helpers/author-types'
import {computed} from 'vue'

const props = defineProps<{
  disabled: boolean
  modelValue: AuthorFilterModel
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value: AuthorFilterModel): void
}>()

const computeFilter = (key: keyof AuthorFilterModel) => {
  return computed({
    get: () => props.modelValue[key],
    set(value) {
      emit(`update:modelValue`, {...props.modelValue, [key]: value})
    },
  })
}

const name = computeFilter(`name`)
const country = computeFilter(`country`)
</script>

<style lang="scss" scoped>

</style>
