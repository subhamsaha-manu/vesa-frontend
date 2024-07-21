import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { CategoryTile } from './CategoryTile'
import useCategoriesContextProvider from '@/context/CategoriesContextProvider'

export const Categories: FC = () => {
  const { categories } = useCategoriesContextProvider()

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
        {categories.map((category) => (
          <CategoryTile category={category} />
        ))}
      </Flex>
    </Flex>
  )
}
