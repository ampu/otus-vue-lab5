export interface AuthorModel {
  id: string
  name: string
  birthday?: string
  sex?: string
  country?: string
}

export interface AuthorFilterModel {
  name?: string
  country?: string
}
