import { createContext, FC, ReactNode, useContext, useMemo, useState } from 'react'

import { CategoriesContextType } from './types'
import { Category } from '@/types'

const CategoriesContext = createContext<CategoriesContextType>({} as CategoriesContextType)

export const CategoriesContextProvider: FC<{
  value?: CategoriesContextType
  children: ReactNode
}> = (props) => {
  const [categories, setCategories] = useState<Array<Pick<Category, 'categoryId' | 'name'>>>([])

  const context = useMemo(
    () => ({
      categories,
      setCategories,
    }),
    [categories, setCategories]
  )

  return <CategoriesContext.Provider value={context}>{props.children}</CategoriesContext.Provider>
}

const useCategoriesContextProvider = () => useContext(CategoriesContext)

export default useCategoriesContextProvider
