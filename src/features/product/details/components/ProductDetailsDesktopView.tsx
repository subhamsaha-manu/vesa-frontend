import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'

import { ContentLayout } from '@/components/Layout'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { AddToCart } from '@/features/user-cart'
import { AddToWishlist } from '@/features/user-wishlist'
import { Product } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type ProductDetailsDesktopViewProps = {
  productDetail: Omit<Product, 'id' | 'categoryIds' | 'status'>
}
export const ProductDetailsDesktopView: FC<ProductDetailsDesktopViewProps> = ({
  productDetail: { description, medias, isOutOfStock, price, productId, thumbnailUrl, title },
}) => {
  const [mainImageURL, setMainImageURL] = useState<string>(thumbnailUrl)
  const { currentUser } = useCurrentUserContext()

  useEffect(() => {
    setMainImageURL(thumbnailUrl)
  }, [thumbnailUrl])

  return (
    <ContentLayout pageTitle={title} showFullPageScroll>
      <Flex display-name="main-product-section" w="100%" gap={6} pt="30px">
        <Flex display-name="product-gallery" w="57%" gap="32px">
          <Flex display-name="thumbnail-images" flexDir="column" gap={4} w="200px">
            <Image
              src={thumbnailUrl}
              alt={title}
              w="100%"
              cursor="pointer"
              onClick={() => setMainImageURL(thumbnailUrl)}
              border={mainImageURL === thumbnailUrl ? '2px solid black' : 'none'}
            />
            {medias.map(({ url, uuid }) => (
              <Image
                key={uuid}
                src={url}
                alt={title}
                h="auto"
                w="100%"
                cursor="pointer"
                onClick={() => setMainImageURL(url)}
                border={mainImageURL === url ? '2px solid black' : 'none'}
              />
            ))}
          </Flex>
          <Flex display-name="primary-image" w="100%">
            <ReactImageMagnify
              {...{
                smallImage: {
                  isFluidWidth: true,
                  src: mainImageURL,
                },
                largeImage: {
                  src: mainImageURL,
                  width: 800,
                  height: 1800,
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
          </Flex>
        </Flex>
        <Flex display-name="product-summary" w="43%" flexDir="column" gap={4}>
          <Flex display-name="product-details" w="100%" flexDir="column" gap={4}>
            <Heading size="lg" color="#1E355B" fontWeight="500">
              {title}
            </Heading>
            <Flex
              display-name="meta-content"
              background={isOutOfStock ? '#FF0000' : '#77a464'}
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
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </Text>
            </Flex>
            <Flex display-name="product-price">
              <Text fontSize="36px" color="#1E355B">
                {`${INR_CURRENCY_SYMBOL} ${price}`}
              </Text>
            </Flex>
            <Flex display-name="product-description">
              <Text fontSize="18px" fontWeight="100">
                {description}
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
              <AddToCart productId={productId} />
              <AddToWishlist productId={productId} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </ContentLayout>
  )
}
