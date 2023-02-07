<template>
  <div class="wrapper">
    <div
      v-for="flash of flashStore.flashes"
      :key="flash.id"
      class="alert alert-dismissible fade show"
      :class="`alert-${flash.status}`"
    >
      <button
        type="button"
        class="btn btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="flashStore.removeFlash(flash)"
      />
      {{ flash.message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useFlashStore} from '@/stores/flash-store'

const flashStore = useFlashStore()
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 10px;
}
</style>
