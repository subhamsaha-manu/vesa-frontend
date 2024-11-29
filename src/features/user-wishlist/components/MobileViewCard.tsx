import { Flex, Image, Text } from '@chakra-ui/react'
import { MultiplicationSignIcon } from 'hugeicons-react'
import { FC } from 'react'

import { MinifiedProduct } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type MobileViewCardProps = {
  wishlistItem: Omit<MinifiedProduct, 'status' | 'id'>
  onItemClick: (productId: string) => void
  onRemoveClick: (productId: string) => void
}

export const MobileViewCard: FC<MobileViewCardProps> = ({
  wishlistItem: { imageUrls, price, productId, title },
  onItemClick,
  onRemoveClick,
}) => (
  <Flex
    display-name="card-container"
    w="calc(50% - 10px)"
    h="auto"
    flexDir="column"
    border="1px solid #E2E8F0"
    gap={4}
    position="relative"
    m="5px"
  >
    <Flex display-name="top-image-section" maxH="126px" w="100%">
      <Image src={imageUrls[0]} alt={title} h="100%" w="100%" />
    </Flex>
    <Flex display-name="bottom-section" w="100%" flexDir="column" gap={2} p={2}>
      <Flex onClick={() => onItemClick(productId)}>
        <Text
          fontSize="md"
          color="#465076"
          display-name="product-name"
          style={{
            width: '140px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          _hover={{ cursor: 'pointer', whiteSpace: 'normal' }}
        >
          {title}
        </Text>
      </Flex>

      <Text display-name="product-price" w="100%" as="b">
        {INR_CURRENCY_SYMBOL} {price}
      </Text>
    </Flex>
    <Flex
      display-name="remove-from-wishlist"
      position="absolute"
      top="5px"
      right="5px"
      onClick={() => onRemoveClick(productId)}
      _hover={{ cursor: 'pointer', transform: 'scale(1.1)' }}
    >
      <MultiplicationSignIcon size={24} color="white" />
    </Flex>
  </Flex>
)
