import React, { FC } from 'react'
import { CartItem } from '@/types'
import { Button, Flex, Text } from '@chakra-ui/react'
import { MobileViewCartListItem } from './MobileViewCartListItem'
import { EmptyCart } from '@/features/user-cart/components/EmptyCart'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type UserCartMobileViewProps = {
  cartItems: Array<CartItem>
  removeProductFromCart: (productId: string, removeAll: boolean) => void
  onItemClick: (productId: string) => void
  totalCartItems: number
  onEmptyCart: () => void
  showSpinner: boolean
  continueShopping: () => void
  onCheckout: () => void
  totalCartAmount: number
  calculateTotalCartAmount: () => void
}
export const UserCartMobileView: FC<UserCartMobileViewProps> = ({
  cartItems,
  removeProductFromCart,
  onItemClick,
  totalCartItems,
  onEmptyCart,
  showSpinner,
  onCheckout,
  totalCartAmount,
  calculateTotalCartAmount,
}) => {
  return (
    <Flex display-name="mobile-view-main-content" w="100%" h="auto" flexDir="column" gap={10}>
      {totalCartItems === 0 ? (
        <EmptyCart isMobile />
      ) : (
        <>
          <Flex
            display-name="products-container"
            flexWrap="wrap"
            justifyContent="space-between"
            borderBottom="1px solid #ececec"
            borderTop="1px solid #ececec"
            py={5}
          >
            {cartItems.map((item) => (
              <MobileViewCartListItem
                item={item}
                removeProductFromCart={removeProductFromCart}
                onItemClick={onItemClick}
                calculateTotalCartAmount={calculateTotalCartAmount}
              />
            ))}
          </Flex>
          <Flex display-name="checkout-section" w="100%" flexDir="column" gap={5}>
            <Flex display-name="total-amount" w="100%" justify="space-evenly">
              <Text size="sm">Estimated Total Amount:</Text>
              <Text size="lg" as="b">
                {INR_CURRENCY_SYMBOL} {totalCartAmount}
              </Text>
            </Flex>
            <Flex display-name="proceed-to-checkout" justify="center">
              <Button
                variant="solid"
                size="md"
                color="white"
                background="black"
                _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
                borderRadius="40px"
                onClick={onCheckout}
                w="100%"
              >
                Proceed to Checkout
              </Button>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  )
}
