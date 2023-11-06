import type {BookModel} from '@/utils/book-types'
import type {AuthorModel} from '@/utils/author-types'

const BookEndpoint = {
  GET_BOOKS: `https://www.googleapis.com/books/v1/volumes`,
}

interface GetBooksJson {
  items: Array<RemoteBookModel>
}

interface RemoteBookModel {
  id: string
  volumeInfo: {
    title: string
    authors: string[]
    publishedDate: string
    description: string
    industryIdentifiers: Array<{ type: string, identifier: string }>
    imageLinks: {
      thumbnail: string
    }
    categories: string[]
  }
  saleInfo: {
    retailPrice: {
      amount: number
    }
  }
}

enum IndustryIdentifierType {
  ISBN_13 = `ISBN_13`,
}

interface BookAndAuthors {
  book: BookModel
  authors: AuthorModel[]
}

const convertBookAndAuthors = (remoteBookModel: RemoteBookModel): BookAndAuthors => {
  const {id, volumeInfo, saleInfo} = remoteBookModel
  const {title, authors: remoteAuthorNames, publishedDate, description, industryIdentifiers, imageLinks, categories} = volumeInfo
  const authors = remoteAuthorNames?.map(convertAuthor) ?? []
  const [category] = categories ?? []

  const book: BookModel = {
    id,
    isbn: industryIdentifiers?.find(({type}) => type === IndustryIdentifierType.ISBN_13)?.identifier,
    year: Number.parseInt(publishedDate) || undefined,
    title,
    authorIds: authors.map(({id}) => id),
    posterUrl: imageLinks.thumbnail,
    description,
    price: saleInfo.retailPrice?.amount,
    category,
  }

  return {book, authors}
}

const convertAuthor = (remoteAuthorName: string): AuthorModel => {
  return {
    id: remoteAuthorName,
    name: remoteAuthorName,
  }
}

const extractAuthors = (bookAndAuthors: BookAndAuthors[]): Map<string, AuthorModel> => {
  const idToAuthor = new Map<string, AuthorModel>()
  for (const {authors} of bookAndAuthors) {
    for (const author of authors) {
      idToAuthor.set(author.id, author)
    }
  }
  return idToAuthor
}

export default {
  async getBooks(query: string) {
    const json = await fetch(`${BookEndpoint.GET_BOOKS}?q=${encodeURIComponent(query)}`)
      .then(response => response.json()) as GetBooksJson

    const bookAndAuthors = json.items.map(convertBookAndAuthors)
    const idToAuthor = extractAuthors(bookAndAuthors)
    return {
      books: bookAndAuthors.map(({book}) => book).filter(Boolean),
      authors: Array.from(idToAuthor.values()),
    }
  }
}
