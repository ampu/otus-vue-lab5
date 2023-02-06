<template>
  <main class="h-100 d-flex flex-column justify-content-center align-items-center mb-5">
    <div class="d-flex flex-column justify-content-center align-items-center mb-5">
      <h1 class="m-5">Bookstore «Gallery»</h1>
      <div class="d-flex flex-wrap gap-5">
        <RouterLink
          :to="{ name: `books` }"
          class="link nav-link"
        >
          <BooksIcon/>
          Books
        </RouterLink>

        <RouterLink
          :to="{ name: `authors` }"
          class="link nav-link"
        >
          <AuthorsIcon/>
          Authors
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import BooksIcon from '@/assets/icons/books.svg'
import AuthorsIcon from '@/assets/icons/authors.svg'
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 2em;
  text-decoration: none;

  opacity: 0.8;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
}
</style>
