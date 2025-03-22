import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Skeleton } from '@heroui/react'
import { FC, useEffect, useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'

import { DeliveryInfo } from './DeliveryInfo'
import { Details } from './Details'
import { SizeOptions } from './SizeOptions'

import { ProductViewProps } from '../types'

import VesaHeading from '@/components/elements/VesaHeading'
import { ContentLayout } from '@/components/Layout'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { AddToCart } from '@/features/user-cart'
import { AddToWishlist } from '@/features/user-wishlist'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

export const DesktopView: FC<ProductViewProps> = ({ productDetail, loading }) => {
  const [mainImageURL, setMainImageURL] = useState<string | undefined>(productDetail?.thumbnailUrl)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const { currentUser } = useCurrentUserContext()

  useEffect(() => {
    setMainImageURL(productDetail?.thumbnailUrl)
  }, [productDetail?.thumbnailUrl])

  return (
    <ContentLayout pageTitle={productDetail?.title ?? ''} showFullPageScroll>
      <Flex display-name="main-product-section" w="100%" gap={6} p={{ xl: '30px 24px 0 24px' }}>
        <Flex display-name="product-gallery" maxW="50%" gap="32px" flex="0 0 50%">
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
                zIndex={2}
                cursor="pointer"
                onClick={() => setMainImageURL(productDetail?.thumbnailUrl)}
                border={mainImageURL === productDetail?.thumbnailUrl ? '2px solid black' : 'none'}
              />

              {productDetail?.medias.map(({ url, uuid }) => (
                <Skeleton
                  style={{ width: '100px', marginBottom: '16px', zIndex: 2 }}
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

          <Flex display-name="primary-image" w="100%">
            <Skeleton style={{ height: '500px', borderRadius: '8px' }} isLoaded={!loading}>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    isFluidWidth: true,
                    src: mainImageURL ?? '',
                  },
                  largeImage: {
                    src: mainImageURL ?? '',
                    width: 600,
                    height: 900,
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
        <Flex display-name="product-summary" maxW="50%" flex="0 0 50%" flexDir="column" gap={4}>
          <Flex display-name="product-details" w="100%" flexDir="column" gap="32px">
            <Skeleton style={{ height: 'max-content', borderRadius: '8px' }} isLoaded={!loading}>
              <VesaHeading text={productDetail?.title ?? ''} color="#1E355B" />
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
                maxW={{ base: '100%', xl: '50%' }}
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
              style={{ height: '36px', width: '100%', borderRadius: '8px' }}
              isLoaded={!loading}
            >
              <Flex display-name="product-price" align="end" gap={4}>
                <Text fontSize="36px" color="#1E355B" fontWeight="600">
                  {`${INR_CURRENCY_SYMBOL} ${productDetail?.price}`}
                </Text>
                <Text fontSize="18px" color="#1E355B" lineHeight="44px">
                  MRP (Inclusive of all taxes)
                </Text>
              </Flex>
            </Skeleton>
            {!loading && (
              <Flex mt="20px" flexDir="column" gap={8}>
                <SizeOptions
                  sizes={['S', 'M', 'L', 'XL']}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                />
                <DeliveryInfo />
                <Details productDetail={productDetail!.description} />
              </Flex>
            )}
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
              <AddToCart
                productId={productDetail?.productId ?? ''}
                isDisabled={productDetail?.isOutOfStock}
                mobileView={false}
              />
              <AddToWishlist productId={productDetail?.productId ?? ''} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </ContentLayout>
  )
}
