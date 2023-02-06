import {ref} from 'vue'
import {defineStore} from 'pinia'

import type {AuthorFilterModel, AuthorModel} from '@/helpers/author-types'

export const useAuthorStore = defineStore(`author`, () => {
  const authors = ref([] as AuthorModel[])

  const getAuthors = (filter?: AuthorFilterModel) => {
    if (!filter) {
      return authors.value
    }
    const {name, country} = filter
    const lcName = name?.toLowerCase()
    const lcCountry = country?.toLowerCase()
    return authors.value.filter((author) => (
      (!lcName || author.name.toLowerCase().includes(lcName))
      && (!lcCountry || author.country?.toLowerCase().includes(lcCountry))
    ))
  }

  const getAuthor = (authorId: string) => authors.value.find((author) => author.id === authorId)

  const addAuthor = async (author: AuthorModel) => {
    authors.value.push(author)
  }

  const updateAuthor = async (author: AuthorModel) => {
    const index = authors.value.findIndex(({id}) => id === author.id)
    if (index !== -1) {
      authors.value[index] = author
    }
  }

  return {
    authors,
    getAuthors,
    getAuthor,
    addAuthor,
    updateAuthor,
  }
})
