import { Category } from '@/types'
import { FC } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { lowerCase } from 'lodash'

type CategoryTileProps = {
  category: Omit<Category, 'description'>
}
export const CategoryTile: FC<CategoryTileProps> = ({ category }) => {
  const navigate = useNavigate()
  return (
    <Flex
      display-name="category-tile-flex"
      flexGrow={1}
      h="100%"
      flexDir="column"
      p={8}
      backgroundImage={category.imageUrl}
      justify="end"
      onClick={() => navigate(`/product-category/${lowerCase(category.name)}`)}
      _hover={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
        transform: 'scale(1.05)',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      }}
    >
      <Flex display-name="content-layout-heading-flex" w="100%" justify="start">
        <Heading size="xl" color="#FFFFFF" fontWeight="500">
          {category.name}
        </Heading>
      </Flex>
    </Flex>
  )
}
