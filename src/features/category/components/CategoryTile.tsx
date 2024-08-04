import { Category } from '@/types'
import { FC } from 'react'
import { Flex, Heading, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { lowerCase, upperCase } from 'lodash'

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
      // h={{ base: '150px', xl: '150px' }}
    >
      {/*<Image src={category.imageUrl} alt={category.name} loading="lazy" h="330px" w="300px" />*/}
      <Image
        src={category.imageUrl}
        alt={category.name}
        loading="lazy"
        h={{ base: '370px', xl: 'auto' }}
        w="100%"
      />
      <Flex
        display-name="category-name-flex"
        position="absolute"
        h="100%"
        p="0 10px"
        align="center"
        background="blackAlpha.700"
      >
        <Heading
          size={{ base: 'xl', xl: 'lg' }}
          color="#FFFFFF"
          fontWeight="700"
          style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
        >
          {upperCase(category.name)}
        </Heading>
      </Flex>
    </Flex>
  )
}
