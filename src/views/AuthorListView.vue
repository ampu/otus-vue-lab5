<template>
  <div>
    <h1 class="mb-3">
      <AuthorsIcon/>
      Authors
    </h1>

    <div class="mb-3 d-flex flex-wrap">
      <RouterLink
        :to="{name: `authors-add`}"
        class="btn btn-primary d-flex align-items-center gap-1"
      >
        <AddIcon/>
        New Author
      </RouterLink>
    </div>

    <AuthorList/>
  </div>
</template>

<script setup lang="ts">
import AddIcon from '@/assets/icons/add.svg'
import AuthorsIcon from '@/assets/icons/authors.svg'
import AuthorList from '@/components/author/AuthorList.vue'
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
