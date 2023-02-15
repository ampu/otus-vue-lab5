<template>
  <form
    data-testid="author-form"
    class="AuthorForm"
    @submit.prevent="onSubmit"
  >
    <div class="content-wrapper">
      <div
        v-if="statuses.pending"
        class="fetch-badge"
      >
        Loading...
      </div>

      <div
        v-if="statuses.error"
        class="fetch-badge"
      >
        Something went wrong... Please come back later!
      </div>

      <div
        class="content"
        :class="{active: statuses.active}"
      >
        <div class="mb-3">
          <label
            for="author-name"
            class="form-label"
          >
            Name
          </label>
          <input
            data-testid="author-name"
            type="text"
            id="author-name"
            class="form-control"
            required
            v-focus
            v-model="author.name"
            :disabled="statuses.disabled"
          />
        </div>

        <div class="mb-3 btn-group">
          <input
            data-testid="author-sex-female"
            type="radio"
            id="author-sex-female"
            value="female"
            class="btn-check"
            v-model="author.sex"
            :disabled="statuses.disabled"
          />
          <label
            for="author-sex-female"
            class="btn btn-outline-primary d-flex align-items-center gap-1"
          >
            <component :is="FemaleIcon"/>
            Female
          </label>
          <input
            data-testid="author-sex-male"
            type="radio"
            id="author-sex-male"
            value="male"
            class="btn-check"
            v-model="author.sex"
            :disabled="statuses.disabled"
          />
          <label
            for="author-sex-male"
            class="btn btn-outline-primary d-flex align-items-center gap-1"
          >
            <component :is="MaleIcon"/>
            Male
          </label>
        </div>

        <div class="mb-3">
          <label
            for="author-birth"
            class="form-label"
          >
            Birthday
          </label>
          <input
            data-testid="author-birth"
            type="date"
            id="author-birth"
            class="form-control"
            v-model="author.birthday"
            :disabled="statuses.disabled"
          />
        </div>

        <div class="mb-3">
          <label
            for="author-country"
            class="form-label"
          >
            Country
          </label>
          <input
            data-testid="author-country"
            type="text"
            id="author-country"
            class="form-control"
            v-model="author.country"
            :disabled="statuses.disabled"
          />
        </div>
      </div>
    </div>

    <div class="mt-4 mb-3 d-flex justify-content-between gap-2">
      <button
        data-testid="author-back"
        type="button"
        class="btn btn-secondary d-flex align-items-center gap-1"
        @click="router.back()"
      >
        <component :is="ReturnIcon"/>
        Back
      </button>
      <button
        data-testid="author-reset"
        type="reset"
        class="btn btn-danger me-auto d-flex align-items-center gap-1"
        @click.prevent="onReset"
        :disabled="statuses.disabled"
      >
        <component :is="ResetIcon"/>
        Reset
      </button>
      <button
        data-testid="author-submit"
        type="submit"
        class="btn btn-primary d-flex align-items-center gap-1"
        :disabled="statuses.disabled"
      >
        <slot>Submit</slot>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref, watch} from 'vue'
import {nanoid} from 'nanoid'
import {useRouter} from 'vue-router'

import MaleIcon from '@/assets/icons/male.svg'
import FemaleIcon from '@/assets/icons/female.svg'
import ResetIcon from '@/assets/icons/reset.svg'
import ReturnIcon from '@/assets/icons/return.svg'

import type {AuthorModel} from '@/helpers/author-types'
import {useBookStore} from '@/stores/book-store'

const props = defineProps<{
  modelValue?: AuthorModel
}>()

const emit = defineEmits<{
  (e: `update:modelValue`, author: AuthorModel): void
}>()

const router = useRouter()
const author = ref({} as AuthorModel)
const bookStore = useBookStore()
const statuses = computed(() => bookStore.fetchStatuses)

const onReset = () => {
  author.value = {} as AuthorModel
  Object.assign(author.value, props.modelValue)
  if (!author.value.id) {
    author.value.id = nanoid()
  }
}

const onSubmit = () => {
  emit(`update:modelValue`, {...author.value})
}

watch(props, onReset, {immediate: true})

onBeforeMount(bookStore.fetchBooks)
</script>

<style lang="scss" scoped>
.content-wrapper {
  position: relative;
}

.fetch-badge {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  font-size: 2em;
  text-shadow: 2px 2px white;
}

.content {
  &:not(.active) {
    filter: blur(5px);
  }
}

.btn:disabled {
  filter: blur(5px);
}
</style>
