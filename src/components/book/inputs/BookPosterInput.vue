<template>
  <div>
    <label
      for="book-poster-url"
      class="form-label"
    >
      Poster
    </label>

    <div class="d-flex justify-content-between align-items-center gap-2">
      <input
        type="text"
        id="book-poster-url"
        class="form-control"
        :placeholder="placeholder"
        v-model="posterUrlProxy"
        :disabled="disabled"
      />

      <label
        for="book-poster-file"
        class="btn btn-primary d-flex align-items-center gap-1"
      >
        <component :is="UploadIcon"/>
        Upload
      </label>
    </div>

    <input
      type="file"
      id="book-poster-file"
      class="visually-hidden"
      :disabled="disabled"
      @change="onPosterFileChange"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'

import UploadIcon from '@/assets/icons/upload.svg'
import {fileToBase64} from '@/helpers/file-helpers'

const props = defineProps<{
  modelValue?: string,
  placeholder: string,
  disabled: boolean,
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value?: string): void
  (event: `update:proxy`, value?: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value?: string) => {
    emit(`update:modelValue`, value)
  }
})

const posterUrlProxy = ref(undefined as string | undefined)

watch(props, () => {
  posterUrlProxy.value = props.modelValue
}, {immediate: true})

const onPosterFileChange = async ($event: Event) => {
  const {files} = ($event.target as HTMLInputElement)
  if (!files) {
    return
  }
  const [file] = files
  value.value = await fileToBase64(file)
}

watch(posterUrlProxy, () => {
  emit(`update:proxy`, posterUrlProxy.value)
})
</script>

<style lang="sass" scoped>

</style>
