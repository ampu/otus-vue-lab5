import {describe, it, expect} from 'vitest'
import {DOMWrapper, mount} from '@vue/test-utils'
import {createTestingPinia} from '@pinia/testing'

import router from '@/router'
import AuthorForm from '@/components/author/AuthorForm.vue'
import {AuthorModel} from '@/utils/author-types'
import FocusDirective from '@/directives/focus-directive'
import {OpStatus} from '@/utils/op-types'
import {expectToHaveDisabledAttribute} from '@/utils/test-helpers'

describe(`AuthorForm`, () => {
  const mountComponent = (
    fetchStatus = OpStatus.NONE,
    modelValue?: AuthorModel,
  ) => {
    const pinia = createTestingPinia({
      initialState: {
        book: {
          fetchStatus,
        },
      },
    })

    return mount(AuthorForm, {
      props: {
        modelValue,
      },
      global: {
        plugins: [router, pinia],
        directives: {
          focus: new FocusDirective(),
        },
      }
    })
  }

  const submitForm = async <TNode extends Node>(
    formWrapper: DOMWrapper<TNode>,
    author: Partial<AuthorModel>,
  ) => {
    const nameWrapper = formWrapper.find(`[data-testid="author-name"]`)
    const sexWrapper = formWrapper.find(`[data-testid="author-sex-${author.sex}"]`)
    const birthWrapper = formWrapper.find(`[data-testid="author-birth"]`)
    const countryWrapper = formWrapper.find(`[data-testid="author-country"]`)

    await nameWrapper.setValue(author.name)
    await sexWrapper.trigger(`click`)
    await sexWrapper.trigger(`change`)
    await birthWrapper.setValue(author.birthday)
    await countryWrapper.setValue(author.country)
    await formWrapper.trigger(`submit`)
  }

  it(`imports without error`, () => {
    expect(AuthorForm).toBeTypeOf(`object`)
  })

  it(`mounts without errors`, () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
  })

  it(`is disabled by default`, async () => {
    const wrapper = mountComponent()
    const nameWrapper = wrapper.find(`[data-testid="author-name"]`)
    expectToHaveDisabledAttribute(nameWrapper)
  })

  it(`creates author correctly`, async () => {
    const newAuthor: Partial<AuthorModel> = {
      name: `Author New`,
      sex: `male`,
      birthday: `2001-02-03`,
      country: `Germany`,
    }

    const wrapper = mountComponent(OpStatus.SUCCESS)
    await submitForm(wrapper.find(`[data-testid="author-form"]`), newAuthor)

    expect(wrapper.emitted()).toHaveProperty(`update:modelValue`, [[{
      id: expect.any(String),
      ...newAuthor,
    }]])
  })

  it(`edits author correctly`, async () => {
    const oldAuthor: AuthorModel = {
      id: `author-id-${Math.random()}`,
      name: `Author Old`,
      sex: `female`,
      birthday: `1994-05-06`,
      country: `Turkey`,
    }
    const newAuthor: AuthorModel = {
      id: oldAuthor.id,
      name: `Author New`,
      sex: `male`,
      birthday: `2001-02-03`,
      country: `Germany`,
    }

    const wrapper = mountComponent(OpStatus.SUCCESS, oldAuthor)
    await submitForm(wrapper.find(`[data-testid="author-form"]`), newAuthor)

    expect(wrapper.emitted()).toHaveProperty(`update:modelValue`, [[newAuthor]])
  })
})
