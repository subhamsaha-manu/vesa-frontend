import React, { FC } from 'react'
import AdjustQuantity from '@/components/elements/AdjustQuantity'
import { useAddProductToCartMutation } from '@/features/user-cart/apis/addProductToCart.generated'
import { userCart } from '@/features/user-cart/apis/userCart'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'

type AdjustCartItemQuantityProps = {
  initialQuantity: number
  productId: string
  removeProductFromCart: (productId: string, removeAll: boolean) => void
  calculateTotalCartAmount: () => void
  maxQuantity?: number
}

export const AdjustCartItemQuantity: FC<AdjustCartItemQuantityProps> = ({
  initialQuantity,
  productId,
  removeProductFromCart,
  calculateTotalCartAmount,
  maxQuantity,
}) => {
  const {
    currentUser: { userId },
  } = useCurrentUserContext()

  const [addProductToCart] = useAddProductToCartMutation({
    onCompleted: () => {
      calculateTotalCartAmount()
    },
    refetchQueries: [{ query: userCart, variables: { userId } }],
  })

  return (
    <AdjustQuantity
      initialQuantity={initialQuantity}
      maxQuantity={maxQuantity}
      onIncrement={() =>
        void addProductToCart({
          variables: {
            userId,
            productId,
          },
        })
      }
      onDecrement={() => removeProductFromCart(productId, false)}
    />
  )
}
