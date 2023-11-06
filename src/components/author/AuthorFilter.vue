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
import {AuthorFilterModel} from '@/utils/author-types'
import {computed} from 'vue'

const props = defineProps<{
  disabled: boolean
  modelValue: AuthorFilterModel
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value: AuthorFilterModel): void
}>()

const useFilterValue = (key: keyof AuthorFilterModel) => {
  return computed({
    get: () => props.modelValue[key],
    set(value) {
      emit(`update:modelValue`, {...props.modelValue, [key]: value})
    },
  })
}

const name = useFilterValue(`name`)
const country = useFilterValue(`country`)
</script>

<style lang="scss" scoped>
</style>
