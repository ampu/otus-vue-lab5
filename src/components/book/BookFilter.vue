<template>
  <tr>
    <th/>
    <th/>
    <th>
      <input
        class="form-control"
        v-model="title"
        :disabled="props.disabled"
      />
    </th>
    <th>
      <div class="input-group">
        <input
          type="number"
          class="form-control"
          v-model="minYear"
          :disabled="props.disabled"
        />
        <span class="input-group-text">-</span>
        <input
          type="number"
          class="form-control"
          v-model="maxYear"
          :disabled="props.disabled"
        />
      </div>
    </th>
    <th>
      <input
        class="form-control"
        v-model="category"
        :disabled="props.disabled"
      />
    </th>
    <th>
      <div class="input-group">
        <input
          type="number"
          class="form-control"
          v-model="minPrice"
          :disabled="props.disabled"
        />
        <span class="input-group-text">-</span>
        <input
          type="number"
          class="form-control"
          v-model="maxPrice"
          :disabled="props.disabled"
        />
      </div>
    </th>
    <th/>
  </tr>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {BookFilterModel} from '@/utils/book-types'

const props = defineProps<{
  disabled: boolean
  modelValue: BookFilterModel
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value: BookFilterModel): void
}>()

const useFilterValue = (key: keyof BookFilterModel) => {
  return computed({
    get: () => props.modelValue[key],
    set(value) {
      emit(`update:modelValue`, {...props.modelValue, [key]: value})
    },
  })
}

const title = useFilterValue(`title`)
const minYear = useFilterValue(`minYear`)
const maxYear = useFilterValue(`maxYear`)
const category = useFilterValue(`category`)
const minPrice = useFilterValue(`minPrice`)
const maxPrice = useFilterValue(`maxPrice`)
</script>

<style lang="scss" scoped>
.input-group {
  @include tablet-mobile {
    .input-group-text {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 0 !important;
      margin: 0 !important;
    }

    input {
      width: 100%;

      &:first-of-type {
        border-radius: 5px 5px 0 0 !important;
        border-bottom: none !important;
      }

      &:last-of-type {
        border-radius: 0 0 5px 5px !important;
        border-top: none !important;
      }
    }
  }
}
</style>
