<template>
  <form
    class="d-flex flex-column"
    @submit.prevent="onSubmit"
  >
    <div class="content-wrapper">
      <div v-if="statuses.pending" class="fetch-badge">Loading...</div>
      <div v-if="statuses.error" class="fetch-badge">Something went wrong... Please come back later!</div>
      <div
        class="content"
        :class="{active: statuses.active}"
      >
        <div class="mb-3 d-flex gap-4">
          <BookPosterOutput
            v-model="isPosterOk"
            :src="book.posterUrl"
            :alt="book.title"
            :placeholder="IMAGE_PLACEHOLDER"
          />

          <div class="d-flex flex-column flex-grow-1">
            <BookTitleInput
              class="mb-3"
              v-model="book.title"
              :disabled="statuses.disabled"
            />

            <BookPosterInput
              class="mb-3"
              v-model="book.posterUrl"
              :placeholder="IMAGE_PLACEHOLDER"
              :disabled="statuses.disabled"
              @update:proxy="syncPosterUrl"
            />
          </div>
        </div>

        <BookAuthorsInput
          class="mb-3"
          v-model="book.authorIds"
          :disabled="statuses.disabled"
        />

        <div class="row mb-3">
          <BookIsbnInput
            class="col"
            v-model="book.isbn"
            :disabled="statuses.disabled"
          />

          <BookYearInput
            class="col"
            v-model="book.year"
            :disabled="statuses.disabled"
          />
        </div>

        <BookDescriptionInput
          class="mb-3"
          v-model="book.description"
          :disabled="statuses.disabled"
        />

        <BookTagsInput
          class="mb-3"
          v-model="book.tags"
          :disabled="statuses.disabled"
        />

        <div class="row mb-3">
          <BookCategoryInput
            class="col"
            v-model="book.category"
            :disabled="statuses.disabled"
          />

          <BookPriceInput
            class="col"
            v-model="book.price"
            :disabled="statuses.disabled"
          />
        </div>
      </div>
    </div>

    <div class="mt-4 mb-3 d-flex justify-content-between gap-2">
      <button
        data-testid="book-back"
        type="button"
        class="btn btn-secondary d-flex align-items-center gap-1"
        @click="router.back()"
      >
        <component :is="ReturnIcon"/>
        Back
      </button>
      <button
        data-testid="book-reset"
        type="reset"
        class="btn btn-danger me-auto d-flex align-items-center gap-1"
        :disabled="statuses.disabled"
        @click.prevent="onReset"
      >
        <component :is="ResetIcon"/>
        Reset
      </button>
      <button
        type="submit"
        class="btn btn-primary d-flex align-items-center gap-1"
        :disabled="statuses.disabled"
      >
        <slot>Submit</slot>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref, watch} from 'vue'
import {nanoid} from 'nanoid'
import _ from 'lodash'

import ResetIcon from '@/assets/icons/reset.svg'
import ReturnIcon from '@/assets/icons/return.svg'
import BookYearInput from '@/components/book/inputs/BookYearInput.vue'
import BookIsbnInput from '@/components/book/inputs/BookIsbnInput.vue'
import BookAuthorsInput from '@/components/book/inputs/BookAuthorsInput.vue'
import BookTitleInput from '@/components/book/inputs/BookTitleInput.vue'
import BookPosterInput from '@/components/book/inputs/BookPosterInput.vue'
import BookPriceInput from '@/components/book/inputs/BookPriceInput.vue'
import BookCategoryInput from '@/components/book/inputs/BookCategoryInput.vue'
import BookTagsInput from '@/components/book/inputs/BookTagsInput.vue'
import BookDescriptionInput from '@/components/book/inputs/BookDescriptionInput.vue'
import BookPosterOutput from '@/components/book/outputs/BookPosterOutput.vue'
import type {BookModel} from '@/utils/book-types'
import {useBookStore} from '@/stores/book-store'
import {useRouter} from 'vue-router'
import {SET_FILTER} from '@/utils/collection-helpers'

const IMAGE_PLACEHOLDER = `https://via.placeholder.com/128x180`

const props = defineProps<{
  modelValue?: BookModel
}>()

const emit = defineEmits<{
  (e: `update:modelValue`, book: BookModel): void
}>()

const router = useRouter()
const bookStore = useBookStore()

const createBook = (): BookModel => ({
  id: nanoid(),
  title: ``,
  description: ``,
  authorIds: [],
  category: ``
})

const statuses = computed(() => bookStore.fetchStatuses)
const book = ref(createBook())
const posterUrl = computed(() => book.value.posterUrl)
const isPosterOk = ref(true)

const onReset = () => {
  book.value = createBook()
  Object.assign(book.value, props.modelValue)
  book.value.authorIds = props.modelValue?.authorIds?.slice() ?? []
}

const syncPosterUrl = _.debounce((value) => {
  book.value.posterUrl = value
}, 500, {leading: false, trailing: true})

const onSubmit = () => {
  syncPosterUrl.flush()
  book.value.authorIds = book.value.authorIds.filter(Boolean).filter(SET_FILTER)

  emit(`update:modelValue`, {...book.value})
}

watch(props, onReset, {immediate: true})

watch(posterUrl, () => {
  isPosterOk.value = !!posterUrl.value
}, {immediate: true})

onBeforeMount(bookStore.fetchBooks)
</script>

<style lang="scss" scoped>
.content-wrapper {
  position: relative;
}

.fetch-badge {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  font-size: 2em;
  text-shadow: 2px 2px white;
}

.content {
  &:not(.active) {
    filter: blur(5px);
  }
}

.btn:disabled {
  filter: blur(5px);
}
</style>
