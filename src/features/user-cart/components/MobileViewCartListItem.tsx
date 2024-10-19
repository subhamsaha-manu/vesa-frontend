import { Flex, Image, Text } from '@chakra-ui/react'
import { Delete04Icon } from 'hugeicons-react'
import { FC } from 'react'

import { AdjustCartItemQuantity } from '@/features/user-cart/components/AdjustCartItemQuantity'
import { CartItem, MinifiedProduct } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type MobileViewCartListItemProps = {
  item: CartItem
  onItemClick: (productId: string) => void
  removeProductFromCart: (productId: string, removeAll: boolean) => void
  calculateTotalCartAmount: () => void
  minifiedProductDetails?: Array<Pick<MinifiedProduct, 'productId' | 'quantity' | 'isOutOfStock'>>
}

export const MobileViewCartListItem: FC<MobileViewCartListItemProps> = ({
  item: { imageUrl, price, productId, quantity, title },
  removeProductFromCart,
  onItemClick,
  calculateTotalCartAmount,
  minifiedProductDetails,
}) => (
  <Flex display-name="cart-item-flex" w="100%" h="auto" flexDir="column" gap={6} mb="40px">
    <Flex display-name="product-details-section" w="100%" h="auto" gap={4}>
      <Flex maxW="100px" maxH="125px">
        <Image src={imageUrl} alt={title} h="100%" w="100%" />
      </Flex>
      <Flex flexDir="column" gap={4} flexGrow={1}>
        <Flex color="#121212">
          <Text
            fontSize="sm"
            fontWeight="500"
            _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => onItemClick(productId)}
          >
            {title}
          </Text>
        </Flex>
        <Flex color="#121212" gap={2}>
          <Text fontSize="sm" fontWeight="500">
            {INR_CURRENCY_SYMBOL} {price}
          </Text>
          <Text fontSize="sm" fontWeight="500">
            x {quantity}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" textAlign="right" gap={1}>
        <Text fontSize="md" fontWeight="500">
          {INR_CURRENCY_SYMBOL}
        </Text>
        <Text fontSize="md" fontWeight="500">
          {price * quantity}
        </Text>
      </Flex>
    </Flex>
    <Flex display-name="bottom-section" align="center" w="100%" h="auto" gap={4} justify="center">
      <AdjustCartItemQuantity
        initialQuantity={quantity}
        productId={productId}
        removeProductFromCart={removeProductFromCart}
        calculateTotalCartAmount={calculateTotalCartAmount}
        maxQuantity={
          minifiedProductDetails?.find((product) => product.productId === productId)?.quantity
        }
      />
      <Flex
        display-name="remove-from-cart"
        onClick={() => removeProductFromCart(productId, true)}
        _hover={{ cursor: 'pointer', transform: 'scale(1.1)', color: 'red' }}
      >
        <Delete04Icon size={18} />
      </Flex>
    </Flex>
  </Flex>
)
