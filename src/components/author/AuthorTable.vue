<template>
  <table class="table table-striped align-middle text-center">
    <thead>
      <AuthorTableHeader/>
      <AuthorFilter
        :disabled="statuses.disabled"
        v-model="filter"
      />
    </thead>

    <TableStatuses
      title="authors"
      :statuses="statuses"
      :isEmpty="isEmpty"
      :isEmptyByFilter="isEmptyByFilter"
    />

    <Transition name="fade" mode="out-in">
      <tbody
        v-if="statuses.active"
        :key="bodyKey"
      >
        <AuthorTableRow
          v-for="author of pageAuthors"
          :key="author.id"
          :author="author"
        />
      </tbody>
    </Transition>

    <TableFooter
      v-if="statuses.active"
      :isFiltered="isFiltered"
      :total="authorStore.authors.length"
      :filtered="filteredAuthors.length"
      :perPage="perPage"
      v-model:page="page"
    />
  </table>
</template>

<script setup lang="ts">
import {onBeforeMount, computed, ref} from 'vue'

import TableFooter from '@/components/TableFooter.vue'
import AuthorTableRow from '@/components/author/AuthorTableRow.vue'

import {useAuthorStore} from '@/stores/author-store'
import {useBookStore} from '@/stores/book-store'
import {AuthorFilterModel} from '@/helpers/author-types'
import {getLatestPage, getPageItems} from '@/helpers/navigation-helpers'
import {usePage} from '@/hooks/use-page'
import TableStatuses from '@/components/TableStatuses.vue'
import AuthorTableHeader from '@/components/author/AuthorTableHeader.vue'
import AuthorFilter from '@/components/author/AuthorFilter.vue'

const authorStore = useAuthorStore()
const bookStore = useBookStore()

const statuses = computed(() => bookStore.fetchStatuses)
const filter = ref({} as AuthorFilterModel)
const isFiltered = computed(() => Object.values(filter.value).some(Boolean))
const filteredAuthors = computed(() => authorStore.getAuthors(filter.value))
const isEmpty = computed(() => authorStore.authors.length === 0)
const isEmptyByFilter = computed(() => filteredAuthors.value.length === 0)
const perPage = ref(5)
const page = usePage(`authors`, () => getLatestPage(filteredAuthors.value.length, perPage.value))
const pageAuthors = computed(() => getPageItems(filteredAuthors.value, page.value, perPage.value))
const bodyKey = computed(() => page.value)

onBeforeMount(bookStore.fetchBooks)
</script>

<style lang="scss" scoped>
</style>
