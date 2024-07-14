import { Category } from '@/types'
import { FC } from 'react'
import { Flex, Heading, Image } from '@chakra-ui/react'
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
      flexDir="column"
      position="relative"
      overflow="hidden"
      justify="end"
      onClick={() => navigate(`/product-category/${lowerCase(category.name)}`)}
      _hover={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
        transform: 'scale(1.05)',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      }}
    >
      <Image src={category.imageUrl} alt={category.name} w="100%" h="auto" loading="lazy" />
      <Flex
        display-name="content-layout-heading-flex"
        position="absolute"
        bottom="40px"
        left="10px"
        p="0 10px"
      >
        <Heading size={{ base: 'sm', xl: 'xl' }} color="#FFFFFF" fontWeight="500">
          {category.name}
        </Heading>
      </Flex>
    </Flex>
  )
}
