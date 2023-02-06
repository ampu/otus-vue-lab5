import {describe, it, expect} from 'vitest'

import {mount} from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe(`Home`, () => {
  it(`renders properly`, () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain(`Bookstore «Gallery»`)
  })
})
