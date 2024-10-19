import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'

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
      p={{ base: 2, xl: '8px' }}
      pb={{ base: 6, xl: 0 }}
      overflowX={{ base: 'scroll', xl: 'hidden' }}
    >
      <Flex
        display-name="categories-container"
        display={{ base: 'flex', xl: 'grid' }}
        gridTemplateColumns="repeat(4, 1fr)"
        flexDirection={{ base: 'row', xl: 'row' }}
        // w="max-content"
        gap="20px"
      >
        {categories.map((category) => (
          <Box minW={{ base: '330px', xl: '1fr' }} key={category.categoryId}>
            <CategoryTile category={category} key={category.categoryId} />
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}
