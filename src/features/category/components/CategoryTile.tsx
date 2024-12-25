import { Flex, Heading, Image } from '@chakra-ui/react'
import { lowerCase, upperCase } from 'lodash'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Category } from '@/types'

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
      <Image src={category.imageUrl} alt={category.name} loading="lazy" h="370px" w="100%" />
      <Flex
        display-name="category-name-flex"
        position="absolute"
        h="100%"
        w="50px"
        p="0 10px"
        alignItems="center"
        justifyContent="center"
        background="blackAlpha.700"
        overflow="hidden"
      >
        <Heading
          fontSize="2xl"
          color="#FFFFFF"
          fontWeight="700"
          style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
          lineHeight="1.2"
          textAlign="center"
          truncate
        >
          {upperCase(category.name)}
        </Heading>
      </Flex>
    </Flex>
  )
}
