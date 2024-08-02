import React, { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductQuery } from '../apis/product.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'

import { ContentLayout } from '@/components/Layout'
import { AddToCart } from '@/features/user-cart'
import { AddToWishlist } from '@/features/user-wishlist'

type ProductParamType = {
  productId: string
}
export const ProductDetails: FC = () => {
  const { productId } = useParams<keyof ProductParamType>() as ProductParamType
  const navigate = useNavigate()

  const { data, loading } = useProductQuery({
    variables: {
      productId,
    },
    fetchPolicy: 'network-only',
  })

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <ContentLayout pageTitle={data.product.title} showFullPageScroll>
      <Flex display-name="main-product-section" w="100%" gap={6} pt="30px">
        <Flex display-name="product-gallery" position="relative" w="57%" pl="104px">
          <Flex display-name="primary-image" position="relative" overflow="hidden" h="597px">
            <Image src={data.product.imageUrl} alt={data.product.title} />
          </Flex>
          <Flex
            display-name="thumbnail-images"
            flexDir="column"
            gap={4}
            w="74px"
            position="absolute"
            top={0}
            left={0}
            mr="30px"
          >
            <Image src={data.product.thumbnailUrl} alt={data.product.title} h="98px" w="100%" />
            <Image src={data.product.thumbnailUrl} alt={data.product.title} h="98px" w="100%" />
            <Image src={data.product.thumbnailUrl} alt={data.product.title} h="98px" w="100%" />
          </Flex>
        </Flex>
        <Flex display-name="product-summary" w="43%" flexDir="column" gap={4}>
          <Flex display-name="product-details" w="100%" flexDir="column" gap={4}>
            <Heading size="lg" color="#1E355B" fontWeight="500">
              {data.product.title}
            </Heading>
            <Flex
              display-name="meta-content"
              background="#77a464"
              p={4}
              gap={4}
              align="center"
              borderRadius={8}
              h="38px"
            >
              <Heading size="sm" color="white">
                Availability
              </Heading>
              <Text size="sm" color="white">
                In Stock
              </Text>
            </Flex>
            <Flex display-name="product-price">
              <Text fontSize="36px" color="#1E355B">
                {`₹ ${data.product.price}`}
              </Text>
            </Flex>
            <Flex display-name="product-description">
              <Text fontSize="18px" fontWeight="100">
                {data.product.description}
              </Text>
            </Flex>
          </Flex>
          <Flex
            display-name="user-action-button-wrapper"
            w="100%"
            gap={6}
            flexDir="row"
            align="center"
            mt="20px"
          >
            <AddToCart productId={productId} />
            <AddToWishlist productId={productId} />
          </Flex>
        </Flex>
      </Flex>
    </ContentLayout>
  )
}
