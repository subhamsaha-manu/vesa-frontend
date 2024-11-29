import { Flex, Heading } from '@chakra-ui/react'
import { FC } from 'react'

import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import Carousel from '@/components/elements/Carousel'
import { Categories } from '@/features/category'
import { Catalogue } from '@/features/product'

export const Dashboard: FC = () => {
  return (
    <Flex flexGrow={1} w="100%" display-name="dashboard-flex" flexDir="column" gap="64px">
      <Carousel imageUrls={[image1, image2, image3]} showText />
      <Flex
        display-name="shop-by-category-flex"
        flexDir="column"
        w="100%"
        justify="center"
        align="center"
        gap={4}
      >
        <Heading size="lg" color="#1E355B" fontWeight="500">
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
        p={{ base: '0 2px', xl: '0 8px' }}
      >
        <Heading size="lg" color="#1E355B" fontWeight="500">
          Our Collection
        </Heading>
        <Catalogue />
      </Flex>
    </Flex>
  )
}
