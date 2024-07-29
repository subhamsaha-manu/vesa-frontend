import React, { FC, RefObject, useState } from 'react'
import { useUserCartQuery } from '../apis/userCart.generated'
import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import round from 'lodash/round'
import { usePlaceOrderMutation } from '../apis/placeOrder.generated'
import { userCart } from '../apis/userCart'
import { FieldValues } from 'react-hook-form'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { ModeOfPayment, PlaceOrderInput } from '@/types'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'

type CartSummaryProps = {
  orderDetailsRef: RefObject<FieldValues | null>
}
export const CartSummary: FC<CartSummaryProps> = ({ orderDetailsRef }) => {
  const [totalCartAmount, setTotalCartAmount] = useState<number>(0)

  const navigate = useNavigate()

  const { data } = useUserCartQuery({
    variables: {
      userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
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
    refetchQueries: [
      { query: userCart, variables: { userId: '286ead03-759a-4748-a802-e2a5e1fc1371' } },
    ],
  })

  const handlePlaceOrderClick = () => {
    setTimeout(() => {
      const input: PlaceOrderInput = {
        userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
        orderItems: data!.userCart.map((cartItem) => ({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
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
      w="32%"
      h="fit-content"
      background="#f2f2f2"
      p={7}
      flexDir="column"
      gap={6}
      mb="100px"
    >
      <Heading>Your Order</Heading>
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
                <Text fontWeight="500">{`₹ ${cartItem.price}`}</Text>
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
            {`₹ ${totalCartAmount}`}
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
            {`₹ ${totalCartAmount}`}
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
