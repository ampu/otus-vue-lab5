<template>
  <AHeader/>

  <RouterView v-slot="{Component}">
    <Transition name="fade" mode="out-in">
      <Component :is="Component"/>
    </Transition>
  </RouterView>

  <FlashList/>
</template>

<script setup lang="ts">
import FlashList from '@/components/flash/FlashList.vue'
import AHeader from '@/components/AHeader.vue'
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
