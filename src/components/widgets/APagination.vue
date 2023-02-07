<template>
  <ul
    class="APagination"
    :class="{active: pagination.totalPages}"
  >
    <li v-if="pagination.previousPage">
      <a
        class="APagination__link"
        rel="prev"
        href="#"
        @click.stop.prevent="onChange(pagination.previousPage)"
      >
        &laquo;&nbsp;{{ translation.previous }}
      </a>
    </li>
    <li v-else class="APagination__page disabled">
      <span class="APagination__link">
        &laquo;&nbsp;{{ translation.previous }}
      </span>
    </li>


    <li v-if="pagination.startPage > 1" class="APagination__page">
      <a class="APagination__link" href="#" @click.stop.prevent="onChange(1)">1</a>
    </li>
    <li v-if="pagination.startPage === 3" class="APagination__page">
      <a class="APagination__link" href="#" @click.stop.prevent="onChange(2)">2</a>
    </li>
    <li v-else-if="pagination.startPage > 3" class="APagination__page disabled">
      <span class="APagination__link">&hellip;</span>
    </li>

    <li
      v-for="aPage of pagination.pagesInRange"
      :key="aPage"
      :class="{
        [`APagination__page`]: true,
        active: aPage === pagination.page
      }"
    >
      <span
        v-if="aPage === pagination.page"
        class="APagination__link"
        v-text="aPage"
      />
      <a
        v-else
        class="APagination__link"
        href="#"
        @click.stop.prevent="onChange(aPage)"
        v-text="aPage"
      />
    </li>


    <li v-if="pagination.totalPages > pagination.endPage + 2" class="APagination__page disabled">
      <span class="APagination__link">&hellip;</span>
    </li>
    <li v-else-if="pagination.totalPages > pagination.endPage + 1" class="APagination__page">
      <a
        class="APagination__link"
        href="#"
        @click.stop.prevent="onChange(pagination.totalPages - 1)"
        v-text="pagination.totalPages - 1"
      />
    </li>

    <li v-if="pagination.totalPages > pagination.endPage">
      <a
        class="APagination__link"
        href="#"
        @click.stop.prevent="onChange(pagination.totalPages)"
        v-text="pagination.totalPages"
      />
    </li>


    <li v-if="pagination.nextPage">
      <a
        class="APagination__link"
        rel="next"
        href="#"
        @click.stop.prevent="onChange(pagination.nextPage)"
      >
        {{ translation.next }}&nbsp;&raquo;
      </a>
    </li>
    <li v-else class="APagination__page disabled">
      <span class="APagination__link">{{ translation.next }}&nbsp;&raquo;</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {computed, watch} from 'vue'

import {createPagination} from '@/helpers/navigation-helpers'

const TRANSLATIONS = {
  en: {
    previousPage: `Previous`,
    nextPage: `Next`,
  },
  ru: {
    previousPage: `Назад`,
    nextPage: `Вперед`,
  },
  de: {
    previousPage: `Vorherige`,
    nextPage: `Nächste`,
  },
}

const props = defineProps<{
  lang?: string
  page: number
  total: number
  perPage: number
}>()

const emit = defineEmits<{
  (event: `update:page`, page: number): void
}>()

const pagination = computed(() => createPagination(props.page, props.total, props.perPage))
const translation = computed(() => (TRANSLATIONS as any)[props.lang ?? `en`])

watch(pagination, () => {
  if (pagination.value.page !== props.page) {
    emit(`update:page`, pagination.value.page)
  }
}, {immediate: true})

const onChange = (page: number) => {
  emit(`update:page`, page)
}
</script>

<style lang="scss" scoped>
.APagination {
  list-style: none;
  margin: 2px;
  padding: 0;
  display: flex;
  gap: 10px;
}

.APagination__link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  text-decoration: none;

  &[href]:hover {
    text-decoration: underline;
  }
}
</style>
