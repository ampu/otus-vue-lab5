<template>
  <tr
    :data-testid="`book-item-${book.id}`"
  >
    <td>
      <ul class="authors">
        <li
          v-for="(authorText, authorKey) in bookAuthors"
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
    <td data-testid="book-title" class="text-start">
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
          :data-testid="`book-edit-${book.id}`"
          type="button"
          class="btn btn-outline-secondary action"
          @click="router.push({name: `books-edit`, params: {bookId: book.id}, query: {redirect: route.fullPath}})"
        >
          <component :is="PencilIcon"/>
        </button>

        <button
          :data-testid="`book-remove-${book.id}`"
          type="button"
          class="btn btn-outline-danger action"
          @click="bookStore.removeBook(book)"
        >
          &times;
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import PencilIcon from '@/assets/icons/edit.svg'

import {BookModel} from '@/helpers/book-types'
import {useBookStore} from '@/stores/book-store'
import {useAuthorStore} from '@/stores/author-store'

const props = defineProps<{
  book: BookModel,
}>()

const bookStore = useBookStore()
const authorStore = useAuthorStore()
const router = useRouter()
const route = useRoute()

const bookAuthors = computed(() => {
  const authors = props.book.authorIds.map(authorStore.getAuthor)
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
})
</script>

<style lang="scss" scoped>
.action {
  width: 42px;
  height: 42px;
}

.poster {
  width: 40px;
  height: 60px;
  object-fit: cover;
}

.authors {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
