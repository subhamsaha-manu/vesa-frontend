import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import { useCategoriesQuery } from './api/categories.generated'
import { CategoriesContextType } from './types'

import { Category } from '@/types'

const CategoriesContext = createContext<CategoriesContextType>({} as CategoriesContextType)

export const CategoriesContextProvider: FC<{
  value?: CategoriesContextType
  children: ReactNode
}> = (props) => {
  const [categories, setCategories] = useState<Array<Omit<Category, 'description'>>>([])

  const { data } = useCategoriesQuery({
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (data) {
      setCategories(data.categories)
    }
  }, [data])

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
