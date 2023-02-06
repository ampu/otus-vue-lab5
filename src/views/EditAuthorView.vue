<template>
  <div>
    <h1>Edit Author</h1>
    <AuthorForm
      :modelValue="author"
      @update:modelValue="onSubmit"
    >
      <EditIcon/>
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
import type {AuthorModel} from '@/helpers/author-types'
import {OpStatus} from '@/helpers/op-types'
import {useBookStore} from '@/stores/book-store'
import {useFlashStore} from '@/stores/flash-store'
import {goToFullPath, goToNotFound} from '@/helpers/navigation-helpers'
import {FlashStatus} from '@/helpers/flash-types'

const props = defineProps<{
  authorId: string
}>()

const router = useRouter()
const route = useRoute()
const {getFetchStatus} = useBookStore()
const {getAuthor, updateAuthor} = useAuthorStore()
const {addFlash} = useFlashStore()
const author = computed(() => getAuthor(props.authorId))
const fetchStatus = computed(getFetchStatus)

watch([author, fetchStatus], () => {
  if (!author.value && fetchStatus.value === OpStatus.SUCCESS) {
    goToNotFound(router, route)
  }
}, {immediate: true})

const onSubmit = async (author: AuthorModel) => {
  await updateAuthor(author)
  addFlash({status: FlashStatus.SUCCESS, message: `Author edited`})
  const redirect = route.query.redirect as string
  if (!redirect) {
    await router.push({name: `authors`})
    return;
  }
  await goToFullPath(router, redirect)
}
</script>
