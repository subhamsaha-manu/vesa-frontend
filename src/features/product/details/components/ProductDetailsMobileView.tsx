import { Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import Zoom from 'react-medium-image-zoom'
import Slider from 'react-slick'
import styled from 'styled-components'

import { ContentLayout } from '@/components/Layout'
import { AddToCart } from '@/features/user-cart'
import { AddToWishlist } from '@/features/user-wishlist'
import { Product } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'
import 'react-medium-image-zoom/dist/styles.css'

type ProductDetailsMobileViewProps = {
  productDetail: Omit<Product, 'id' | 'categoryIds' | 'status'>
}

export const ProductDetailsMobileView: FC<ProductDetailsMobileViewProps> = ({ productDetail }) => {
  const productImages = [...productDetail.medias.map((m) => m.url), productDetail.thumbnailUrl]

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
          <Text fontSize="lg">{productDetail.title}</Text>
        </Flex>
        <SliderWrapper display-name="product-images-slider">
          <Slider {...settings}>
            {productImages.map((image, index) => (
              <Zoom key={index}>
                <img
                  alt={productDetail.title}
                  src={image}
                  width="500"
                  style={{ cursor: 'zoom-in' }}
                />
              </Zoom>
            ))}
          </Slider>
        </SliderWrapper>
        <Flex w="100%" flexDir="column" gap={4} mt={4}>
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
