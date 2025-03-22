import { Text } from '@chakra-ui/layout'
import { Flex, Grid, Image } from '@chakra-ui/react'
import { FC } from 'react'
import { BiSolidTrash } from 'react-icons/bi'

import { AddToCart } from '@/features/user-cart'
import { MinifiedProduct } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type WishlistContentProps = {
  wishlistItems: Array<Omit<MinifiedProduct, 'status' | 'id'>>
  onRemoveClick: (productId: string) => void
  onItemClick: (productId: string) => void
}

export const WishlistContent: FC<WishlistContentProps> = ({
  wishlistItems,
  onItemClick,
  onRemoveClick,
}) => {
  return (
    <Flex display-name="main-content" w="100%" h="100%" gap={6} justify="space-between">
      <Flex display-name="wishlist-items-flex" w="100%" h="auto" flexDir="column">
        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          gap={6}
        >
          {wishlistItems.map(({ imageUrls, price, productId, title }) => (
            <Flex
              flexDir="column"
              borderRadius={2}
              display-name="product-tile-flex"
              key={productId}
              cursor="pointer"
              position="relative"
            >
              <Image
                src={imageUrls[0]}
                alt={title}
                borderRadius="4px"
                borderBottomRadius={0}
                loading="lazy"
                width="100%"
                aspectRatio="3/4"
                style={{ transition: 'transform 0.3s ease-in-out' }}
                onClick={() => onItemClick(productId)}
              />
              <AddToCart
                productId={productId}
                isDisabled={false}
                roundedButton={false}
                mobileView={false}
              />
              <Flex flexDir="column" mt={4}>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="#1E355B"
                  textAlign="center"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  _hover={{
                    color: '#FF6363',
                    transition: 'color 0.3s',
                  }}
                >
                  {title}
                </Text>

                <Flex alignItems="center" justifyContent="center" mt="8px">
                  <Text
                    fontSize="md"
                    fontWeight="600"
                    color="#555"
                    ml="4px"
                    _hover={{
                      color: '#FF6363',
                      transition: 'color 0.3s',
                    }}
                  >
                    {INR_CURRENCY_SYMBOL} {price.toFixed(2)}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                position="absolute"
                top="20px"
                right="5%"
                width="40px"
                height="32px"
                opacity="0.98"
                transition="opacity .1s ease-in-out, visibility .1s ease-in-out;"
                align="center"
                justify="center"
                zIndex={2}
                cursor="pointer"
              >
                <BiSolidTrash
                  data-testid="delete-media"
                  style={{ height: '24px', width: '24px' }}
                  color="#555555"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation() // Prevent triggering zoom on delete
                    onRemoveClick(productId)
                  }}
                />
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Flex>
    </Flex>
  )
}
