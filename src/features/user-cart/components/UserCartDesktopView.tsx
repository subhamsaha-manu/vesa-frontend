import { CartItem } from '@/types'
import React, { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { EmptyCart } from '@/features/user-cart/components/EmptyCart'
import { CartContent } from '@/features/user-cart/components/CartContent'

type UserCartDesktopViewProps = {
  cartItems: Array<CartItem>
  removeProductFromCart: (productId: string, removeAll: boolean) => void
  onItemClick: (productId: string) => void
  totalCartItems: number
  continueShopping: () => void
  onCheckout: () => void
  totalCartAmount: number
  calculateTotalCartAmount: () => void
}
export const UserCartDesktopView: FC<UserCartDesktopViewProps> = ({
  cartItems,
  removeProductFromCart,
  onItemClick,
  totalCartItems,
  continueShopping,
  onCheckout,
  totalCartAmount,
  calculateTotalCartAmount,
}) => {
  return (
    <Flex display-name="main-cart-section" w="100%" gap={6} pt="30px" flexDir="column">
      {totalCartItems !== 0 && (
        <Flex
          display-name="continue-shopping-flex"
          w="100%"
          align="center"
          justify="end"
          onClick={continueShopping}
        >
          <Text color="#00bb00" _hover={{ cursor: 'pointer', textDecoration: 'underline' }}>
            Continue Shopping
          </Text>
        </Flex>
      )}
      {totalCartItems === 0 ? (
        <EmptyCart isMobile={false} />
      ) : (
        <CartContent
          cartItems={cartItems}
          removeProductFromCart={removeProductFromCart}
          onItemClick={onItemClick}
          onCheckout={onCheckout}
          totalCartAmount={totalCartAmount}
          calculateTotalCartAmount={calculateTotalCartAmount}
        />
      )}
    </Flex>
  )
}
