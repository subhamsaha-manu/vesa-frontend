import { Product } from '@/types'
import React, { FC, useEffect, useState } from 'react'
import { ContentLayout } from '@/components/Layout'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { AddToCart } from '@/features/user-cart'
import { AddToWishlist } from '@/features/user-wishlist'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'

type ProductDetailsDesktopViewProps = {
  productDetail: Omit<Product, 'id' | 'categoryIds'>
}
export const ProductDetailsDesktopView: FC<ProductDetailsDesktopViewProps> = ({
  productDetail,
}) => {
  const [mainImageURL, setMainImageURL] = useState<string>()
  const { currentUser } = useCurrentUserContext()

  useEffect(() => {
    setMainImageURL(productDetail.imageUrl)
  }, [productDetail])

  return (
    <ContentLayout pageTitle={productDetail.title} showFullPageScroll>
      <Flex display-name="main-product-section" w="100%" gap={6} pt="30px">
        <Flex display-name="product-gallery" position="relative" w="57%" pl="104px">
          <Flex display-name="primary-image" position="relative" overflow="hidden" h="597px">
            <Image src={mainImageURL} alt={productDetail.title} />
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
            <Image
              src={productDetail.imageUrl}
              alt={productDetail.title}
              h="98px"
              w="100%"
              cursor="pointer"
              onClick={() => setMainImageURL(productDetail.imageUrl)}
              border={mainImageURL === productDetail.imageUrl ? '2px solid black' : 'none'}
            />
            {Array.from({ length: 3 }).map((_, index) => (
              <Image
                src={productDetail.thumbnailUrl}
                alt={productDetail.title}
                h="98px"
                w="100%"
                cursor="pointer"
                onClick={() => setMainImageURL(productDetail.thumbnailUrl)}
                border={mainImageURL === productDetail.thumbnailUrl ? '2px solid black' : 'none'}
              />
            ))}
          </Flex>
        </Flex>
        <Flex display-name="product-summary" w="43%" flexDir="column" gap={4}>
          <Flex display-name="product-details" w="100%" flexDir="column" gap={4}>
            <Heading size="lg" color="#1E355B" fontWeight="500">
              {productDetail.title}
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
                {`${INR_CURRENCY_SYMBOL} ${productDetail.price}`}
              </Text>
            </Flex>
            <Flex display-name="product-description">
              <Text fontSize="18px" fontWeight="100">
                {productDetail.description}
              </Text>
            </Flex>
          </Flex>
          {!currentUser?.isAdmin && (
            <Flex
              display-name="user-action-button-wrapper"
              w="100%"
              gap={6}
              flexDir="row"
              align="center"
              mt="20px"
            >
              <AddToCart productId={productDetail.productId} />
              <AddToWishlist productId={productDetail.productId} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </ContentLayout>
  )
}
