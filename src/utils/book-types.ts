export interface BookModel {
  id: string
  isbn?: string
  year?: number
  title: string
  authorId?: string
  authorIds: string[]
  posterUrl?: string
  description: string
  tags?: string
  price?: number
  category: string
}

export interface BookFilterModel {
  title?: string
  minYear?: number
  maxYear?: number
  category?: string
  minPrice?: number
  maxPrice?: number
}
