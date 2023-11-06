<template>
  <div>
    <h1>Edit Author</h1>
    <AuthorForm
      :modelValue="author"
      @update:modelValue="onSubmit"
    >
      <component :is="EditIcon"/>
      Edit
    </AuthorForm>
  </div>
</template>

<script setup lang="ts">
import {computed, watch} from 'vue'

import EditIcon from '@/assets/icons/edit.svg'
import AuthorForm from '@/components/author/AuthorForm.vue'
import {useAuthorStore} from '@/stores/author-store'
import {useRouter, useRoute} from 'vue-router'
import type {AuthorModel} from '@/utils/author-types'
import {useBookStore} from '@/stores/book-store'
import {useFlashStore} from '@/stores/flash-store'
import {goToFullPath, goToNotFound} from '@/utils/navigation-helpers'
import {FlashStatus} from '@/utils/flash-types'

const props = defineProps<{
  authorId: string
}>()

const router = useRouter()
const route = useRoute()
const bookStore = useBookStore()
const authorStore = useAuthorStore()
const flashStore = useFlashStore()
const author = computed(() => authorStore.getAuthor(props.authorId))
const statuses = computed(() => bookStore.fetchStatuses)

watch([author, statuses], () => {
  if (!author.value && statuses.value.active) {
    goToNotFound(router, route)
  }
}, {immediate: true})

const onSubmit = async (author: AuthorModel) => {
  await authorStore.updateAuthor(author)
  flashStore.addFlash({status: FlashStatus.SUCCESS, message: `Author edited`})
  const redirect = route.query.redirect as string
  if (!redirect) {
    await router.push({name: `authors`})
    return
  }
  await goToFullPath(router, redirect)
}
</script>
