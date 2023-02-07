<template>
  <div>
    <h1>New Author</h1>
    <AuthorForm @update:modelValue="onSubmit">
      <AddIcon/>
      Add
    </AuthorForm>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'

import AddIcon from '@/assets/icons/add.svg'
import AuthorForm from '@/components/author/AuthorForm.vue'
import {useAuthorStore} from '@/stores/author-store'
import {useFlashStore} from '@/stores/flash-store'
import type {AuthorModel} from '@/helpers/author-types'
import {FlashStatus} from '@/helpers/flash-types'

const router = useRouter()
const authorStore = useAuthorStore()
const flashStore = useFlashStore()

const onSubmit = async (author: AuthorModel) => {
  await authorStore.addAuthor(author)
  flashStore.addFlash({status: FlashStatus.SUCCESS, message: `Author added`})
  await router.push({name: `authors`, query: {page: -1}})
}
</script>
