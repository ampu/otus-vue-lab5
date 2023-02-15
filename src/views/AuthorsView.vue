<template>
  <div>
    <h1 class="mb-3">
      <component :is="AuthorsIcon"/>
      Authors
    </h1>

    <div class="mb-3 d-flex flex-wrap">
      <RouterLink
        :to="{name: `authors-add`}"
        class="btn btn-primary d-flex align-items-center gap-1"
      >
        <component :is="AddIcon"/>
        New Author
      </RouterLink>
    </div>

    <AuthorTable/>
  </div>
</template>

<script setup lang="ts">
import AddIcon from '@/assets/icons/add.svg'
import AuthorsIcon from '@/assets/icons/authors.svg'
import AuthorTable from '@/components/author/AuthorTable.vue'
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
