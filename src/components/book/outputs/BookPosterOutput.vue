<template>
  <div class="poster-wrapper">
    <img
      class="poster active"
      :src="placeholder"
      :alt="alt"
      :title="alt"
      width="128"
      height="180"
      @error="onPosterError"
    />
    <img
      class="poster"
      :class="{active: value}"
      :src="src"
      :alt="alt"
      :title="alt"
      width="128"
      height="180"
      @error="onPosterError"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

const props = defineProps<{
  modelValue: boolean
  src?: string
  alt?: string
  placeholder: string
}>()

const emit = defineEmits<{
  (event: `update:modelValue`, value: boolean): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit(`update:modelValue`, value)
  }
})

const onPosterError = () => {
  value.value = false
}
</script>

<style lang="scss" scoped>
.poster-wrapper {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 180px;

  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.poster {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 128px;
  height: 180px;
  object-fit: cover;

  border-radius: 5px;
  opacity: 0;

  &.active {
    opacity: 1;
  }
}
</style>
