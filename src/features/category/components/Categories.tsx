import { FC, useEffect } from 'react'
import { useCategoriesQuery } from '../apis/categories.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Flex } from '@chakra-ui/react'
import { CategoryTile } from './CategoryTile'
import useCategoriesContextProvider from '@/context/CategoriesContextProvider'

export const Categories: FC = () => {
  const { setCategories } = useCategoriesContextProvider()

  const { data, loading } = useCategoriesQuery({
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data) {
      setCategories(
        data.categories.map((category) => ({
          categoryId: category.categoryId,
          name: category.name,
        }))
      )
    }
  }, [data])

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <Flex
      display-name="categories-dashboard-flex"
      w="100%"
      h="auto"
      flexDir="column"
      p={{ base: 2, xl: 10 }}
    >
      <Flex
        display-name="categories-container"
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="20px"
      >
        {data.categories.map((category) => (
          <CategoryTile category={category} />
        ))}
      </Flex>
    </Flex>
  )
}
