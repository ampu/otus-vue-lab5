<template>
  <div>
    <h1 class="mb-3">
      <BooksIcon/>
      Books
    </h1>

    <div class="mb-3 d-flex flex-wrap">
      <RouterLink
        :to="{name: `books-add`}"
        class="btn btn-primary d-flex align-items-center gap-1"
      >
        <AddIcon/>
        New Book
      </RouterLink>
    </div>

    <BookList/>
  </div>
</template>

<script setup lang="ts">
import AddIcon from '@/assets/icons/add.svg'
import BooksIcon from '@/assets/icons/books.svg'
import BookList from '@/components/book/BookList.vue'
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>

