import { Category } from '@/types'

export type CategoriesContextType = {
  categories: Array<Pick<Category, 'categoryId' | 'name'>>
  setCategories: (param: Array<Pick<Category, 'categoryId' | 'name'>>) => void
}
