import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Skeleton } from '@nextui-org/react'
import { FC, useEffect, useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'

import { ProductViewProps } from '../types'

import { ContentLayout } from '@/components/Layout'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { AddToCart } from '@/features/user-cart'
import { AddToWishlist } from '@/features/user-wishlist'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

export const ProductDetailsDesktopView: FC<ProductViewProps> = ({ productDetail, loading }) => {
  const [mainImageURL, setMainImageURL] = useState<string | undefined>(productDetail?.thumbnailUrl)
  const { currentUser } = useCurrentUserContext()

  useEffect(() => {
    setMainImageURL(productDetail?.thumbnailUrl)
  }, [productDetail?.thumbnailUrl])

  return (
    <ContentLayout pageTitle={productDetail?.title ?? ''} showFullPageScroll>
      <Flex display-name="main-product-section" w="100%" gap={6} p={{ xl: '30px 250px 0 250px' }}>
        <Flex display-name="product-gallery" w="57%" gap="32px">
          {loading ? (
            <Flex display-name="thumbnail-images-skeleton" flexDir="column" gap={4} w="100px">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  style={{ height: '200px', width: '100px' }}
                  isLoaded={!loading}
                />
              ))}
            </Flex>
          ) : (
            <Flex display-name="thumbnail-images" flexDir="column" gap={4} w="100px">
              <Image
                src={productDetail?.thumbnailUrl}
                alt={productDetail?.title}
                w="100px"
                cursor="pointer"
                onClick={() => setMainImageURL(productDetail?.thumbnailUrl)}
                border={mainImageURL === productDetail?.thumbnailUrl ? '2px solid black' : 'none'}
              />

              {productDetail?.medias.map(({ url, uuid }) => (
                <Skeleton
                  style={{ width: '100px', marginBottom: '16px' }}
                  isLoaded={!loading}
                  key={uuid}
                >
                  <Image
                    src={url}
                    alt={productDetail?.title}
                    h="auto"
                    w="100%"
                    cursor="pointer"
                    onClick={() => setMainImageURL(url)}
                    border={mainImageURL === url ? '2px solid black' : 'none'}
                  />
                </Skeleton>
              ))}
            </Flex>
          )}

          <Flex display-name="primary-image" w="100%" maxW="421px" maxH="678px">
            <Skeleton style={{ height: '500px', borderRadius: '8px' }} isLoaded={!loading}>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    isFluidWidth: true,
                    src: mainImageURL ?? '',
                  },
                  largeImage: {
                    src: mainImageURL ?? '',
                    width: 500,
                    height: 800,
                  },
                  enlargedImageContainerStyle: {
                    zIndex: 9,
                    border: '1px solid #ddd',
                    background: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  },
                  enlargedImagePosition: 'beside',
                }}
              />
            </Skeleton>
          </Flex>
        </Flex>
        <Flex display-name="product-summary" w="43%" flexDir="column" gap={4}>
          <Flex display-name="product-details" w="100%" flexDir="column" gap="32px">
            <Skeleton
              style={{ height: '36px', width: '75%', borderRadius: '8px' }}
              isLoaded={!loading}
            >
              <Heading size="lg" color="#1E355B" fontWeight="500">
                {productDetail?.title}
              </Heading>
            </Skeleton>
            <Skeleton
              style={{ height: '36px', width: '100%', borderRadius: '8px' }}
              isLoaded={!loading}
            >
              <Flex
                display-name="meta-content"
                background={productDetail?.isOutOfStock ? '#FF0000' : '#77a464'}
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
                  {productDetail?.isOutOfStock ? 'Out of Stock' : 'In Stock'}
                </Text>
              </Flex>
            </Skeleton>
            <Skeleton
              style={{ height: '36px', width: '40%', borderRadius: '8px' }}
              isLoaded={!loading}
            >
              <Flex display-name="product-price">
                <Text fontSize="36px" color="#1E355B">
                  {`${INR_CURRENCY_SYMBOL} ${productDetail?.price}`}
                </Text>
              </Flex>
            </Skeleton>
            <Skeleton
              style={{ height: '80px', width: '100%', borderRadius: '8px' }}
              isLoaded={!loading}
            >
              <Flex display-name="product-description">
                <Text fontSize="18px" fontWeight="100">
                  {productDetail?.description}
                </Text>
              </Flex>
            </Skeleton>
          </Flex>
          {!currentUser?.isAdmin && !loading && (
            <Flex
              display-name="user-action-button-wrapper"
              w="100%"
              gap={6}
              flexDir="row"
              align="center"
              mt="20px"
            >
              <AddToCart productId={productDetail?.productId ?? ''} />
              <AddToWishlist productId={productDetail?.productId ?? ''} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </ContentLayout>
  )
}
