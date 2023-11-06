export interface AuthorModel {
  id: string
  name: string
  birthday?: string
  sex?: `male` | `female`
  country?: string
}

export interface AuthorFilterModel {
  name?: string
  country?: string
}
