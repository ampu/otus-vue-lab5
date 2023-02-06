<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light mb-3">
      <ul class="navbar-nav">
        <li
          v-for="{name, title} of LINKS"
          :key="name"
          class="nav-item"
          :class="{active: route.name === name}"
        >
          <RouterLink
            :to="{name}"
            class="nav-link"
            :class="{active: route.name === name}"
          >
            {{ title }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router'

const LINKS = [
  {name: `home`, title: `Home`},
  {name: `books`, title: `Books`},
  {name: `authors`, title: `Authors`},
]

const route = useRoute()
</script>

<style lang="scss" scoped>
nav {
  background-color: rgba(#fafbfc, 1)
}

.nav-link {
  text-shadow: 1px 1px 0 white;
  transition: opacity 0.3s;

  &.active {
    cursor: default;
  }

  &:not(.active) {
    opacity: 0.8;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
