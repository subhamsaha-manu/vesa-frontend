import { Flex, Text } from '@chakra-ui/react'
import { Skeleton } from '@nextui-org/react'
import { FC } from 'react'
import Zoom from 'react-medium-image-zoom'
import Slider from 'react-slick'
import styled from 'styled-components'

import { ProductViewProps } from '../types'

import { ContentLayout } from '@/components/Layout'
import { AddToCart } from '@/features/user-cart'
import { AddToWishlist } from '@/features/user-wishlist'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

import 'react-medium-image-zoom/dist/styles.css'

export const ProductDetailsMobileView: FC<ProductViewProps> = ({ productDetail, loading }) => {
  const productImages = productDetail
    ? [...productDetail.medias.map((m) => m.url), productDetail.thumbnailUrl]
    : []

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
    <ContentLayout pageTitle={productDetail?.title ?? ''} showFullPageScroll>
      <Flex w="100%" gap={4} pt="10px" flexDir="column">
        <Skeleton style={{ height: '28px', width: '75%', borderRadius: '4px' }} isLoaded={!loading}>
          <Flex w="100%">
            <Text fontSize="lg">{productDetail?.title}</Text>
          </Flex>
        </Skeleton>
        <Skeleton style={{ height: '500px', width: '100%' }} isLoaded={!loading}>
          <SliderWrapper display-name="product-images-slider">
            <Slider {...settings}>
              {productImages.map((image, index) => (
                <Zoom key={index}>
                  <img
                    alt={productDetail?.title}
                    src={image}
                    width="500"
                    style={{ cursor: 'zoom-in' }}
                  />
                </Zoom>
              ))}
            </Slider>
          </SliderWrapper>
        </Skeleton>

        <Flex w="100%" flexDir="column" gap={4} mt={4}>
          <Skeleton style={{ height: '28px', width: '75%' }} isLoaded={!loading}>
            <Text fontSize="md">{productDetail?.title}</Text>
          </Skeleton>
          <Skeleton style={{ height: '28px', width: '35%' }} isLoaded={!loading}>
            <Text fontSize="md" as="b">
              {INR_CURRENCY_SYMBOL} {productDetail?.price}
            </Text>
          </Skeleton>
          <Skeleton style={{ height: '56px' }} isLoaded={!loading}>
            <Text fontSize="md">{productDetail?.description}</Text>
          </Skeleton>
        </Flex>
        {productDetail && (
          <Flex w="100%" display-name="action-buttons" gap={4}>
            <AddToCart productId={productDetail.productId} mobileView />
            <AddToWishlist productId={productDetail.productId} />
          </Flex>
        )}
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
