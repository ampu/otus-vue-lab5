<template>
  <div>
    <h1 class="mb-3">
      <component :is="BooksIcon"/>
      Books
    </h1>

    <div class="mb-3 d-flex flex-wrap">
      <RouterLink
        data-testid="book-add"
        :to="{name: `books-add`}"
        class="btn btn-primary d-flex align-items-center gap-1"
      >
        <component :is="AddIcon"/>
        New Book
      </RouterLink>
    </div>

    <BookTable/>
  </div>
</template>

<script setup lang="ts">
import AddIcon from '@/assets/icons/add.svg'
import BooksIcon from '@/assets/icons/books.svg'
import BookTable from '@/components/book/BookTable.vue'
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>

