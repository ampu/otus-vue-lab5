<template>
  <main class="h-100 d-flex flex-column justify-content-center align-items-center mb-5">
    <div class="d-flex flex-column justify-content-center align-items-center mb-5">
      <h1 class="m-5">Bookstore «Gallery»</h1>
      <ul class="links d-flex align-items-center gap-5">
        <li
          v-for="{name, title, icon} of LINKS"
          :key="name"
        >
          <RouterLink
            :data-testid="`home-${name}`"
            :to="{name}"
            class="link nav-link"
          >
            <component :is="icon"/>
            {{ title }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import BooksIcon from '@/assets/icons/books.svg'
import AuthorsIcon from '@/assets/icons/authors.svg'

const LINKS = [
  {name: `books`, title: `Books`, icon: BooksIcon},
  {name: `authors`, title: `Authors`, icon: AuthorsIcon},
]
</script>

<style lang="scss" scoped>
.links {
  list-style: none;
  margin: 0;
  padding: 0;
}

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
