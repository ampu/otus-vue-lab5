import {expect, vi} from 'vitest'
import {DOMWrapper} from '@vue/test-utils'
import {RouteLocationRaw} from 'vue-router'

import router from '@/router'

export const stubScrollTo = () => {
  window.scrollTo = vi.fn() as any
}

export const expectToHaveDisabledAttribute = <TNode extends Node>(wrapper: DOMWrapper<TNode>) => {
  expect(wrapper.attributes(`disabled`)).toBeDefined()
}

export const clickAndExpectRouterPush = async (wrapper: DOMWrapper<Element>, route: RouteLocationRaw, shouldWaitForNavigation = false) => {
  const pushSpy = vi.spyOn(router, `push`)
  await wrapper.trigger(`click`)
  expect(pushSpy).toHaveBeenCalledWith(expect.objectContaining(route))
  pushSpy.mockClear()

  if (shouldWaitForNavigation) {
    await router.push(route)
    expect(router.currentRoute.value).toEqual(expect.objectContaining(route))
  }
}
