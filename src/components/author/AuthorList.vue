<template>
  <table class="table table-striped align-middle text-center">
    <thead>
      <tr class="title">
        <th>Name</th>
        <th>Country</th>
        <th style="width: 58px"/>
      </tr>
      <tr class="filter">
        <th>
          <input class="form-control" v-model="filter.name" :disabled="statuses.disabled"/>
        </th>
        <th>
          <input class="form-control" v-model="filter.country" :disabled="statuses.disabled"/>
        </th>
        <th/>
      </tr>
    </thead>
    <tbody v-if="statuses.pending">
      <tr>
        <td colspan="10">Loading...</td>
      </tr>
    </tbody>

    <tbody v-if="statuses.error">
      <tr>
        <td colspan="10">Something went wrong... Please come back later!</td>
      </tr>
    </tbody>

    <tbody v-if="statuses.active && isEmpty">
      <tr>
        <td colspan="10">No authors found... Please add one!</td>
      </tr>
    </tbody>
    <tbody v-else-if="statuses.active && isEmptyByFilter">
      <tr>
        <td colspan="10">No authors matching your filter... Please weaken your requirements!</td>
      </tr>
    </tbody>

    <tbody v-if="statuses.active">
      <tr
        v-for="author of pageAuthors"
        :key="author.id"
      >
        <td>
          {{ author.name }}
        </td>
        <td>
          {{ author.country ?? `-` }}
        </td>
        <td>
          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-outline-secondary action"
              @click="router.push({name: `authors-edit`, params: {authorId: author.id}, query: {redirect: route.fullPath}})"
            >
              <PencilIcon/>
            </button>
          </div>
        </td>
      </tr>
    </tbody>

    <TableFooter
      v-if="statuses.active"
      v-model:page="page"
      :isFiltered="isFiltered"
      :total="authorStore.authors.length"
      :filtered="filteredAuthors.length"
      :perPage="perPage"
    />
  </table>
</template>

<script setup lang="ts">
import {onBeforeMount, computed, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'

import PencilIcon from '@/assets/icons/edit.svg'
import TableFooter from '@/components/TableFooter.vue'

import {useAuthorStore} from '@/stores/author-store'
import {useBookStore} from '@/stores/book-store'
import type {AuthorFilterModel} from '@/helpers/author-types'
import {getLatestPage, getPageItems} from '@/helpers/navigation-helpers'
import {usePage} from '@/hooks/use-page'

const router = useRouter()
const route = useRoute()
const authorStore = useAuthorStore()
const bookStore = useBookStore()

const statuses = computed(() => bookStore.fetchStatuses)
const filter = ref({} as AuthorFilterModel)
const isFiltered = computed(() => Object.values(filter.value).some(Boolean))
const filteredAuthors = computed(() => authorStore.getAuthors(filter.value))
const pageAuthors = computed(() => getPageItems(filteredAuthors.value, page.value, perPage.value))
const isEmpty = computed(() => authorStore.authors.length === 0)
const isEmptyByFilter = computed(() => filteredAuthors.value.length === 0)
const perPage = ref(5)
const page = usePage(`authors`, () => getLatestPage(filteredAuthors.value.length, perPage.value))

onBeforeMount(bookStore.fetchBooks)
</script>

<style lang="scss" scoped>
.action {
  width: 42px;
  height: 42px;
}
</style>
