<template>
  <div>
    <h1>Edit Book</h1>
    <BookForm
      :modelValue="book"
      @update:modelValue="onSubmit"
    >
      <component :is="EditIcon"/>
      Edit
    </BookForm>
  </div>
</template>

<script setup lang="ts">
import {computed, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import EditIcon from '@/assets/icons/edit.svg'
import BookForm from '@/components/book/BookForm.vue'
import {useBookStore} from '@/stores/book-store'
import {useFlashStore} from '@/stores/flash-store'
import type {BookModel} from '@/helpers/book-types'
import {goToFullPath, goToNotFound} from '@/helpers/navigation-helpers'
import {FlashStatus} from '@/helpers/flash-types'

const props = defineProps<{
  bookId: string
}>()

const router = useRouter()
const route = useRoute()
const bookStore = useBookStore()
const flashStore = useFlashStore()
const book = computed(() => bookStore.getBook(props.bookId))
const statuses = computed(() => bookStore.fetchStatuses)

watch([book, statuses], () => {
  if (!book.value && statuses.value.active) {
    goToNotFound(router, route)
  }
}, {immediate: true})

const onSubmit = async (book: BookModel) => {
  await bookStore.updateBook(book)
  flashStore.addFlash({status: FlashStatus.SUCCESS, message: `Book edited`})
  const redirect = route.query.redirect as string
  if (!redirect) {
    await router.push({name: `books`})
    return;
  }
  await goToFullPath(router, redirect)
}
</script>
