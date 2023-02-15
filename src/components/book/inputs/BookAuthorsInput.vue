<template>
  <div>
    <div class="form-label">
      {{ value.length === 0 ? `No authors known for this book... Please add one!` : `Authors` }}
    </div>

    <div
      v-for="(_, authorOrder) of value"
      :key="authorOrder"
      class="mb-3 d-flex gap-2"
    >
      <select
        class="form-select col"
        v-model="value[authorOrder]"
        :disabled="disabled"
      >
        <option disabled>-- select one --</option>
        <option
          v-for="author of authorStore.authors"
          :key="author.id"
          :value="author.id"
        >
          {{ author.name }}
        </option>
      </select>
      <button
        type="button"
        class="btn btn-outline-danger action col-auto"
        @click="removeAuthor(authorOrder)"
      >
        &times;
      </button>
    </div>

    <button
      type="button"
      class="btn btn-primary"
      @click="addAuthor"
    >
      <component :is="AddIcon"/>
      Add Author
    </button>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

import AddIcon from '@/assets/icons/add.svg'
import {useAuthorStore} from '@/stores/author-store'

const props = defineProps<{
  modelValue: string[],
  disabled: boolean,
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value: string[]): void
}>()

const authorStore = useAuthorStore()

const value = computed({
  get: () => props.modelValue,
  set: (value: string[]) => {
    emit(`update:modelValue`, value)
  }
})

const addAuthor = () => {
  const copy = value.value.slice()
  copy.length += 1
  value.value = copy
}

const removeAuthor = (authorOrder: number) => {
  value.value = value.value.filter((_, i) => i !== authorOrder)
}
</script>

<style lang="scss" scoped>
</style>
