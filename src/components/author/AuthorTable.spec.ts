import {describe, it, expect, vi, afterEach} from 'vitest'
import {mount} from '@vue/test-utils'

import AuthorTable from '@/components/author/AuthorTable.vue'
import {AuthorModel} from '@/helpers/author-types'
import {createTestingPinia} from '@pinia/testing'
import router from '@/router'
import {useBookStore} from '@/stores/book-store'
import {OpStatus} from '@/helpers/op-types'
import {clickAndExpectRouterPush} from '@/helpers/test-helpers'

describe(`AuthorTable`, () => {
  const ITEMS: AuthorModel[] = [
    {id: `1`, name: `Author #1`},
    {id: `2`, name: `Author #2`, sex: `male`},
    {id: `3`, name: `Author #3`, country: `Germany`},
    {id: `4`, name: `Author #4`, birthday: `1987-08-26`},
    {id: `5`, name: `Author #5`, sex: `female`, country: `Poland`},
    {id: `6`, name: `Author #6`, sex: `male`, birthday: `1900-01-01`},
    {id: `7`, name: `Author #7`, sex: `female`, country: `Israel`, birthday: `1982-08-19`},
  ]

  const mountComponent = (
    fetchStatus = OpStatus.NONE,
    authors = [] as AuthorModel[],
  ) => {
    const pinia = createTestingPinia({
      stubActions: false,
      initialState: {
        book: {
          fetchStatus,
        },
        author: {
          authors,
        }
      },
    })

    const bookStore = useBookStore()
    bookStore.fetchBooks = vi.fn()

    return mount(AuthorTable, {
      global: {
        plugins: [router, pinia],
      }
    })
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it(`imports without error`, () => {
    expect(AuthorTable).toBeTypeOf(`object`)
  })

  it(`mounts without errors`, () => {
    const wrapper = mountComponent(undefined, ITEMS)
    expect(wrapper.exists()).toBe(true)
  })

  it(`renders by default`, () => {
    const wrapper = mountComponent(undefined, ITEMS)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`renders list`, () => {
    const wrapper = mountComponent(OpStatus.SUCCESS, ITEMS)

    const itemWrappers = wrapper.findAll(`[data-testid^="author-item-"]`)
    expect(itemWrappers.map((item) => item.text())).toMatchSnapshot()
  })

  it(`navigates to author edit`, async () => {
    const wrapper = mountComponent(OpStatus.SUCCESS, ITEMS)
    const editWrapper = wrapper.find(`[data-testid="author-edit-1"]`)
    expect(editWrapper.exists()).toBe(true)

    await clickAndExpectRouterPush(editWrapper, {name: `authors-edit`, params: {authorId: '1'}})
  })

  it(`navigates to pages`, async () => {
    const wrapper = mountComponent(OpStatus.SUCCESS, ITEMS)
    const pageWrappers = wrapper.findAll(`[data-testid="pagination-page"]`)
    expect(pageWrappers).toHaveLength(4)

    const lastPageWrapper = pageWrappers[2]
    expect(lastPageWrapper.text()).toBe(`2`)

    const route = {
      name: `authors`,
      query: {page: `2`},
    }
    await clickAndExpectRouterPush(lastPageWrapper, route, true)

    const itemWrappers = wrapper.findAll(`[data-testid^="author-item-"]`)
    expect(itemWrappers.map((item) => item.text())).toMatchSnapshot()
  })
})
