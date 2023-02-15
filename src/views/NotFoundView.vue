<template>
  <main class="h-100 d-flex flex-column justify-content-center align-items-center mb-5">
    <div class="d-flex flex-column justify-content-center align-items-center mb-5">
      <h1 class="m-5">There is nothing here... Sorry!</h1>
      <div class="d-flex flex-wrap gap-5">
        <button
          class="btn link nav-link"
          @click="router.back()"
        >
          <component :is="BackIcon"/>
          Back
        </button>
        <RouterLink
          :to="{ name: `home` }"
          class="link nav-link"
        >
          <component :is="HomeIcon"/>
          Home
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'

import HomeIcon from '@/assets/icons/home.svg'
import BackIcon from '@/assets/icons/return.svg'

const router = useRouter()
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
