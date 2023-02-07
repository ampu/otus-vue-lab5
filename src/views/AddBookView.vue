<template>
  <div>
    <h1>New Book</h1>
    <BookForm @update:modelValue="onSubmit">
      <AddIcon/>
      Add
    </BookForm>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'

import AddIcon from '@/assets/icons/add.svg'
import BookForm from '@/components/book/BookForm.vue'
import {useBookStore} from '@/stores/book-store'
import {useFlashStore} from '@/stores/flash-store'
import type {BookModel} from '@/helpers/book-types'
import {FlashStatus} from '@/helpers/flash-types'

const router = useRouter()
const bookStore = useBookStore()
const flashStore = useFlashStore()

const onSubmit = async (book: BookModel) => {
  await bookStore.addBook(book)
  flashStore.addFlash({status: FlashStatus.SUCCESS, message: `Book added`})
  await router.push({name: `books`, query: {page: -1}})

}
</script>
