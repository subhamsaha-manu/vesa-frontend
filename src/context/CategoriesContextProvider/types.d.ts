import { Category } from '@/types'

export type CategoriesContextType = {
  categories: Array<Omit<Category, 'description'>>
  setCategories: (param: Array<Omit<Category, 'description'>>) => void
}
