<template>
  <table class="table table-striped align-middle text-center">
    <thead>
      <BookTableHeader/>
      <BookFilter
        :disabled="statuses.disabled"
        v-model="filter"
      />
    </thead>

    <TableStatuses
      title="books"
      :statuses="statuses"
      :isEmpty="isEmpty"
      :isEmptyByFilter="isEmptyByFilter"
    />

    <Transition name="fade" mode="out-in">
      <tbody
        v-if="statuses.active"
        :key="page"
      >
        <BookTableRow
          v-for="book of pageBooks"
          :key="book.id"
          :book="book"
        />
      </tbody>
    </Transition>

    <TableFooter
      v-if="statuses.active"
      :isFiltered="isFiltered"
      :total="bookStore.books.length"
      :filtered="filteredBooks.length"
      :perPage="perPage"
      v-model:page="page"
    />
  </table>
</template>

<script setup lang="ts">
import {onBeforeMount, computed, ref} from 'vue'

import BookTableRow from '@/components/book/BookTableRow.vue'
import TableStatuses from '@/components/TableStatuses.vue'
import BookTableHeader from '@/components/book/BookTableHeader.vue'
import BookFilter from '@/components/book/BookFilter.vue'

import {useBookStore} from '@/stores/book-store'
import {BookFilterModel} from '@/utils/book-types'
import TableFooter from '@/components/TableFooter.vue'
import {getLatestPage, getPageItems} from '@/utils/navigation-helpers'
import {usePage} from '@/composables/use-page'

const bookStore = useBookStore()

const statuses = computed(() => bookStore.fetchStatuses)
const filter = ref({} as BookFilterModel)
const isFiltered = computed(() => Object.values(filter.value).some(Boolean))
const filteredBooks = computed(() => bookStore.getBooks(filter.value))
const isEmpty = computed(() => bookStore.books.length === 0)
const isEmptyByFilter = computed(() => filteredBooks.value.length === 0)
const perPage = ref(5)
const page = usePage(`books`, () => getLatestPage(filteredBooks.value.length, perPage.value))
const pageBooks = computed(() => getPageItems(filteredBooks.value, page.value, perPage.value))

onBeforeMount(bookStore.fetchBooks)
</script>

<style lang="scss" scoped>
</style>
