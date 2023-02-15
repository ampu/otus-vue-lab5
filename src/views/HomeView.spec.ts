import {describe, it, expect} from 'vitest'
import {shallowMount} from '@vue/test-utils'

import HomeView from '@/views/HomeView.vue'
import router from '@/router'

describe(`HomeView`, () => {
  const mountComponent = () => {
    return shallowMount(HomeView, {
      global: {
        plugins: [router],
      },
    })
  }

  it(`imports without error`, () => {
    expect(HomeView).toBeTypeOf(`object`)
  })

  it(`mounts without error`, () => {
    const wrapper = mountComponent()
    expect(wrapper).toBeDefined()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
