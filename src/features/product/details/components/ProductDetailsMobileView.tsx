import { Box, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

import { ContentLayout } from '@/components/Layout'
import { AddToCart } from '@/features/user-cart'
import { AddToWishlist } from '@/features/user-wishlist'
import { Product } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type ProductDetailsMobileViewProps = {
  productDetail: Omit<Product, 'id' | 'categoryIds'>
}
export const ProductDetailsMobileView: FC<ProductDetailsMobileViewProps> = ({ productDetail }) => {
  const productImages = [productDetail.imageUrl, productDetail.thumbnailUrl]

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    touch: true,
  }
  return (
    <ContentLayout pageTitle={productDetail.title} showFullPageScroll>
      <Flex w="100%" gap={4} pt="10px" flexDir="column">
        <Flex w="100%">
          <Text fontSize="xs">{productDetail.title}</Text>
        </Flex>
        <SliderWrapper display-name="product-images-slider">
          <Slider {...settings}>
            {productImages.map((url, index) => (
              <Box
                display-name="product-image"
                key={index}
                height="400px"
                bgPos="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                bgImage={`url(${url})`}
              />
            ))}
          </Slider>
        </SliderWrapper>
        <Flex w="100%" flexDir="column" gap={4}>
          <Text fontSize="md">{productDetail.title}</Text>
          <Text fontSize="md" as="b">
            {INR_CURRENCY_SYMBOL} {productDetail.price}
          </Text>
          <Text fontSize="md">{productDetail.description}</Text>
        </Flex>
        <Flex w="100%" display-name="action-buttons" gap={4}>
          <AddToCart productId={productDetail.productId} mobileView />
          <AddToWishlist productId={productDetail.productId} />
        </Flex>
      </Flex>
    </ContentLayout>
  )
}

const SliderWrapper = styled(Flex)`
  width: 100%;

  .slick-slider {
    width: 100%;
  }
`
