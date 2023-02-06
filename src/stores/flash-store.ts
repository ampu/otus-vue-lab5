import {ref} from 'vue'
import {defineStore} from 'pinia'
import {nanoid} from 'nanoid'

import type {FlashModel, FlashStatus} from '@/helpers/flash-types'

const DEFAULT_TIMEOUT = 3000
const SCHEDULER_INTERVAL = 1000

export const useFlashStore = defineStore(`flash`, () => {
  const flashes = ref([] as FlashModel[])

  const getFlashes = () => flashes.value

  const addFlash = ({
    status,
    message,
    ttl = DEFAULT_TIMEOUT,
  }: {
    status: FlashStatus,
    message: string
    ttl?: number
  }) => {
    flashes.value.push({
      id: nanoid(),
      status,
      message,
      deadTimestamp: performance.now() + ttl
    })
  }

  const removeFlash = ({id}: FlashModel) => {
    flashes.value = flashes.value.filter((flash) => flash.id !== id)
  }

  const runScheduler = () => {
    setInterval(() => {
      const now = performance.now()
      const predicate = (flash: FlashModel) => now < flash.deadTimestamp
      if (!flashes.value.every(predicate)) {
        flashes.value = flashes.value.filter(predicate)
      }
    }, SCHEDULER_INTERVAL)
  }

  runScheduler()

  return {
    flashes,
    getFlashes,
    addFlash,
    removeFlash,
  }
})
