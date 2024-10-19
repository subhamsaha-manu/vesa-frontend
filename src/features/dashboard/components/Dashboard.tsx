import { Flex, Heading } from '@chakra-ui/react'
import { FC } from 'react'

import Carousel from './Carousel'

import { Categories } from '@/features/category'
import { Catalogue } from '@/features/product'

export const Dashboard: FC = () => {
  return (
    <Flex flexGrow={1} w="100%" display-name="dashboard-flex" flexDir="column" gap="64px">
      <Carousel />
      <Flex
        display-name="shop-by-category-flex"
        flexDir="column"
        w="100%"
        justify="center"
        align="center"
        gap={4}
      >
        <Heading size={{ base: 'md', xl: 'lg' }} color="#1E355B" fontWeight="500">
          Shop By Category
        </Heading>
        <Categories />
      </Flex>

      <Flex
        display-name="catalogue-flex"
        flexDir="column"
        w="100%"
        justify="center"
        align="center"
        gap={4}
        p={{ base: '0 2px', xl: '0 32px' }}
      >
        <Heading size={{ base: 'md', xl: 'lg' }} color="#1E355B" fontWeight="500">
          Our Collection
        </Heading>
        <Catalogue />
      </Flex>
    </Flex>
  )
}
