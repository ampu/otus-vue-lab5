<template>
  <tbody v-if="props.statuses.pending">
    <tr>
      <td :colspan="colspan">Loading...</td>
    </tr>
  </tbody>

  <tbody v-if="props.statuses.error">
    <tr>
      <td :colspan="colspan">Something went wrong... Please come back later!</td>
    </tr>
  </tbody>

  <tbody v-if="props.statuses.active && props.isEmpty">
    <tr>
      <td :colspan="colspan">No {{ props.title }} found... Please add one!</td>
    </tr>
  </tbody>
  <tbody v-else-if="props.statuses.active && props.isEmptyByFilter">
    <tr>
      <td :colspan="colspan">No {{ props.title }} matching your filter... Please weaken your requirements!</td>
    </tr>
  </tbody>
</template>

<script lang="ts" setup>
import {OpStatuses} from '@/helpers/op-types'
import {computed} from 'vue'

const DEFAULT_COLSPAN = 10

const props = defineProps<{
  title: string
  statuses: OpStatuses
  isEmpty: boolean
  isEmptyByFilter: boolean
  colspan?: number
}>()

const colspan = computed(() => props.colspan ?? DEFAULT_COLSPAN)
</script>

<style lang="scss" scoped>
</style>
