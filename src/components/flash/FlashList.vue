<template>
  <ul class="popup">
    <TransitionGroup name="flash">
      <li
        v-for="flash of flashStore.flashes"
        :key="flash.id"
        class="alert alert-dismissible"
        :class="`alert-${flash.status}`"
      >
        <button
          type="button"
          class="btn btn-close"
          aria-label="Close"
          @click="flashStore.removeFlash(flash)"
        />
        {{ flash.message }}
      </li>
    </TransitionGroup>
  </ul>
</template>

<script lang="ts" setup>
import {useFlashStore} from '@/stores/flash-store'

const flashStore = useFlashStore()
</script>

<style lang="scss" scoped>
.popup {
  list-style: none;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  padding: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
}

.flash-move,
.flash-enter-active,
.flash-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.flash-enter-from,
.flash-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.flash-leave-active {
  position: absolute;
}
</style>
