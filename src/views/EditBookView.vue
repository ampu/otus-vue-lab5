<template>
  <div>
    <h1>Edit Book</h1>
    <BookForm
      :modelValue="book"
      @update:modelValue="onSubmit"
    >
      <EditIcon/>
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
import {OpStatus} from '@/helpers/op-types'
import {goToFullPath, goToNotFound} from '@/helpers/navigation-helpers'
import {FlashStatus} from '@/helpers/flash-types'

const props = defineProps<{
  bookId: string
}>()

const router = useRouter()
const route = useRoute()
const {getBook, getFetchStatus} = useBookStore()
const {addFlash} = useFlashStore()
const book = computed(() => getBook(props.bookId))
const fetchStatus = computed(getFetchStatus)
const {updateBook} = useBookStore()

watch([book, fetchStatus], () => {
  if (!book.value && fetchStatus.value === OpStatus.SUCCESS) {
    goToNotFound(router, route)
  }
}, {immediate: true})

const onSubmit = async (book: BookModel) => {
  await updateBook(book)
  addFlash({status: FlashStatus.SUCCESS, message: `Book edited`})
  const redirect = route.query.redirect as string
  if (!redirect) {
    await router.push({name: `books`})
    return;
  }
  await goToFullPath(router, redirect)
}
</script>
