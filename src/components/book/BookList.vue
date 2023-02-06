<template>
  <table class="table table-striped align-middle text-center">
    <thead>
      <tr class="title">
        <th style="width: 20%">Authors</th>
        <th style="width: 5%"></th>
        <th>Title</th>
        <th style="width: 15%">Year</th>
        <th style="width: 15%">Category</th>
        <th style="width: 15%">Price</th>
        <th/>
      </tr>
      <tr class="filter">
        <th/>
        <th/>
        <th>
          <input class="form-control" v-model="filter.title" :disabled="fetchStatus !== OpStatus.SUCCESS"/>
        </th>
        <th>
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              v-model="filter.minYear"
              :disabled="fetchStatus !== OpStatus.SUCCESS"
            />
            <span class="input-group-text">-</span>
            <input
              type="number"
              class="form-control"
              v-model="filter.maxYear"
              :disabled="fetchStatus !== OpStatus.SUCCESS"
            />
          </div>
        </th>
        <th>
          <input class="form-control" v-model="filter.category" :disabled="fetchStatus !== OpStatus.SUCCESS"/>
        </th>
        <th>
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              v-model="filter.minPrice"
              :disabled="fetchStatus !== OpStatus.SUCCESS"
            />
            <span class="input-group-text">-</span>
            <input
              type="number"
              class="form-control"
              v-model="filter.maxPrice"
              :disabled="fetchStatus !== OpStatus.SUCCESS"
            />
          </div>
        </th>
        <th/>
      </tr>
    </thead>

    <tbody v-if="fetchStatus === OpStatus.PENDING">
      <tr>
        <td colspan="10">Loading...</td>
      </tr>
    </tbody>

    <tbody v-if="fetchStatus === OpStatus.ERROR">
      <tr>
        <td colspan="10">Something went wrong... Please come back later!</td>
      </tr>
    </tbody>

    <tbody v-if="fetchStatus === OpStatus.SUCCESS && isEmpty">
      <tr>
        <td colspan="10">No books found... Please add one!</td>
      </tr>
    </tbody>
    <tbody v-else-if="fetchStatus === OpStatus.SUCCESS && isEmptyByFilter">
      <tr>
        <td colspan="10">No books matching your filter... Please weaken your requirements!</td>
      </tr>
    </tbody>

    <tbody v-if="fetchStatus === OpStatus.SUCCESS">
      <tr
        v-for="book of pageBooks"
        :key="book.id"
      >
        <td>
          <ul class="author-list">
            <li
              v-for="(authorText, authorKey) in formatAuthors(book.authorIds)"
              :key="authorKey"
              v-text="authorText"
            />
          </ul>
        </td>
        <td>
          <img
            v-if="book.posterUrl"
            :src="book.posterUrl"
            :alt="book.title"
            :title="book.title"
            height="60"
            width="40"
            class="poster"
          />
        </td>
        <td class="text-start">
          {{ book.title }}
        </td>
        <td>
          {{ book.year ?? `-` }}
        </td>
        <td>
          {{ book.category ?? `-` }}
        </td>
        <td class="text-end">
          {{ book.price ? `${book.price?.toFixed(2)} ₽` : `-` }}
        </td>
        <td>
          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-outline-secondary action"
              @click="router.push({name: `books-edit`, params: {bookId: book.id}, query: {redirect: route.fullPath}})"
            >
              <PencilIcon/>
            </button>

            <button
              type="button"
              class="btn btn-outline-danger action"
              @click="removeBook(book)"
            >
              &times;
            </button>
          </div>
        </td>
      </tr>
    </tbody>

    <TableFooter
      v-if="fetchStatus === OpStatus.SUCCESS"
      v-model:page="page"
      :isFiltered="isFiltered"
      :total="allBooks.length"
      :filtered="filteredBooks.length"
      :perPage="perPage"
    />
  </table>
</template>

<script setup lang="ts">
import {onBeforeMount, computed, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import PencilIcon from '@/assets/icons/edit.svg'

import {useBookStore} from '@/stores/book-store'
import type {BookFilterModel} from '@/helpers/book-types'
import {useAuthorStore} from '@/stores/author-store'
import {OpStatus} from '@/helpers/op-types'
import TableFooter from '@/components/TableFooter.vue'
import {getLatestPage, getPageItems} from '@/helpers/navigation-helpers'
import {usePage} from '@/hooks/use-page'

const router = useRouter()
const route = useRoute()
const {getBooks, fetchBooks, getFetchStatus, removeBook} = useBookStore()
const {getAuthor} = useAuthorStore()

const fetchStatus = computed(getFetchStatus)
const filter = ref({} as BookFilterModel)
const isFiltered = computed(() => Object.values(filter.value).some(Boolean))
const allBooks = computed(getBooks)
const filteredBooks = computed(() => getBooks(filter.value))
const pageBooks = computed(() => getPageItems(filteredBooks.value, page.value, perPage.value))
const isEmpty = computed(() => allBooks.value.length === 0)
const isEmptyByFilter = computed(() => filteredBooks.value.length === 0)
const perPage = ref(5)
const page = usePage(`books`, () => getLatestPage(filteredBooks.value.length, perPage.value))

const formatAuthors = (authorIds: string[]) => {
  const authors = authorIds.map(getAuthor)
  if (authors.length === 0) {
    return {
      [``]: `-`,
    }
  }
  if (authors.length < 3) {
    return Object.fromEntries(authors.map((author) => [author?.id, author?.name]))
  }
  const [author] = authors
  return {
    [String(author?.id)]: author?.name,
    [``]: `and ${authors.length - 1} more`,
  }
}

onBeforeMount(fetchBooks)
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

.action {
  width: 42px;
  height: 42px;
}

.poster {
  width: 40px;
  height: 60px;
  object-fit: cover;
}

.author-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
