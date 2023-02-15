<template>
  <tr :data-testid="`author-item-${props.author.id}`">
    <td>
      {{ props.author.name }}
    </td>
    <td>
      {{ props.author.country ?? `-` }}
    </td>
    <td>
      <div class="d-flex gap-2">
        <button
          type="button"
          class="btn btn-outline-secondary action"
          :data-testid="`author-edit-${props.author.id}`"
          @click="router.push({name: `authors-edit`, params: {authorId: props.author.id}, query: {redirect: route.fullPath}})"
        >
          <component :is="PencilIcon"/>
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'

import PencilIcon from '@/assets/icons/edit.svg'

import {AuthorModel} from '@/helpers/author-types'

const props = defineProps<{
  author: AuthorModel
}>()

const router = useRouter()
const route = useRoute()
</script>

<style lang="scss" scoped>
.action {
  width: 42px;
  height: 42px;
}
</style>
