import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

import Carousel from '@/components/elements/Carousel'
import VesaHeading from '@/components/elements/VesaHeading'
import { Categories } from '@/features/category'
import { Catalogue } from '@/features/product'
import {
  CAROUSEL_IMAGE_0_URL,
  CAROUSEL_IMAGE_1_URL,
  CAROUSEL_IMAGE_2_URL,
  CAROUSEL_IMAGE_3_URL,
} from '@/utils/constants'

export const Dashboard: FC = () => {
  return (
    <Flex flexGrow={1} w="100%" display-name="dashboard-flex" flexDir="column" gap="64px">
      <Carousel
        imageUrls={[
          CAROUSEL_IMAGE_0_URL,
          CAROUSEL_IMAGE_1_URL,
          CAROUSEL_IMAGE_2_URL,
          CAROUSEL_IMAGE_3_URL,
        ]}
        showText
      />
      <Flex
        display-name="shop-by-category-flex"
        flexDir="column"
        w="100%"
        justify="center"
        align="center"
        gap={4}
      >
        <VesaHeading text="Shop by Category" />
        <Categories />
      </Flex>

      <Flex
        display-name="catalogue-flex"
        flexDir="column"
        w="100%"
        justify="center"
        align="center"
        gap={8}
        p={{ base: '0 2px', xl: '0 50px' }}
      >
        <VesaHeading text="Our Collection" />
        <Catalogue />
      </Flex>
    </Flex>
  )
}
