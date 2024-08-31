import React, { FC, RefObject, useState } from 'react'
import { useUserCartQuery } from '../apis/userCart.generated'
import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import round from 'lodash/round'
import { usePlaceOrderMutation } from '../apis/placeOrder.generated'
import { userCart } from '../apis/userCart'
import { FieldValues } from 'react-hook-form'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { CartItem, ModeOfPayment, PlaceOrderInput } from '@/types'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type CartSummaryProps = {
  orderDetailsRef: RefObject<FieldValues | null>
}
export const CartSummary: FC<CartSummaryProps> = ({ orderDetailsRef }) => {
  const [totalCartAmount, setTotalCartAmount] = useState<number>(0)

  const navigate = useNavigate()

  const {
    currentUser: { userId },
  } = useCurrentUserContext()

  const { data } = useUserCartQuery({
    variables: {
      userId,
    },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (isEmpty(data.userCart)) {
        navigate('/cart')
      }
      const totalAmount = data.userCart.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)

      setTotalCartAmount(round(totalAmount, 2))
    },
  })

  const toast = useToast()

  const [placeOrder, { loading }] = usePlaceOrderMutation({
    onCompleted: () => {
      toast({
        title: 'Order placed successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/')
    },
    refetchQueries: [{ query: userCart, variables: { userId } }],
  })

  const handlePlaceOrderClick = () => {
    setTimeout(() => {
      const input: PlaceOrderInput = {
        userId,
        orderItems: data!.userCart.map((cartItem: CartItem) => ({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: cartItem.price,
        })),
        modeOfPayment: ModeOfPayment.CreditCard,
        country: 'India',
        ...orderDetailsRef.current,
      } as PlaceOrderInput

      void placeOrder({
        variables: {
          placeOrderInput: input,
        },
      })
    }, 200)
  }

  return (
    <Flex
      display-name="cart-summary"
      w={{ base: '100%', xl: '32%' }}
      h="fit-content"
      background="#f2f2f2"
      p={{ base: '5', xl: '7' }}
      flexDir="column"
      gap={{ base: 4, xl: 6 }}
      mb={{ base: '0', xl: '100px' }}
    >
      <Heading fontSize={{ base: 'lg', xl: 'xl' }}>Your Order</Heading>
      <Flex flexDir="column">
        <Flex
          display-name="cart-summary-heading-flex"
          justify="space-between"
          p="15px 0"
          borderBottom="1px solid #e6e6e6"
        >
          <Text fontSize="md" fontWeight="500">
            Product
          </Text>
          <Text fontSize="md" fontWeight="500">
            Subtotal
          </Text>
        </Flex>
        <Flex
          display-name="cart-summary-products"
          p="15px 0"
          borderBottom="1px solid #e6e6e6"
          gap={3}
          flexDir="column"
        >
          {data?.userCart.map((cartItem) => (
            <Flex justify="space-between">
              <Flex gap={2}>
                <Text fontSize="lg">{cartItem.title}</Text>
                <Text fontWeight="500">{`x ${cartItem.quantity}`}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="500">{`${INR_CURRENCY_SYMBOL} ${cartItem.price}`}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
        <Flex
          display-name="cart-summary-subtotal"
          justify="space-between"
          p="15px 0"
          borderBottom="1px solid #e6e6e6"
        >
          <Text fontSize="md" fontWeight="500">
            Subtotal
          </Text>
          <Text fontSize="md" fontWeight="500">
            {`${INR_CURRENCY_SYMBOL} ${totalCartAmount}`}
          </Text>
        </Flex>
        <Flex
          display-name="cart-summary-total"
          justify="space-between"
          p="15px 0"
          borderBottom="1px solid #e6e6e6"
        >
          <Text fontSize="md" fontWeight="500">
            Total
          </Text>
          <Text fontSize="md" fontWeight="500">
            {`${INR_CURRENCY_SYMBOL} ${totalCartAmount}`}
          </Text>
        </Flex>
      </Flex>
      <Flex display-name="proceed-to-checkout" justify="center">
        <Button
          variant="solid"
          size="lg"
          color="white"
          background="black"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="40px"
          onClick={handlePlaceOrderClick}
          w="100%"
          fontSize="25px"
          fontWeight="300"
          type="submit"
          form="hook-form"
          leftIcon={loading ? <SpinnerContainer size="20px" overflow="unset" /> : <> </>}
        >
          Place Order
        </Button>
      </Flex>
    </Flex>
  )
}
