import React, { FC, useState } from 'react'
import { useUserCartQuery } from '@/features/user-cart/apis/userCart.generated'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import noop from 'lodash/noop'
import round from 'lodash/round'

export const CartSummary: FC = () => {
  const [totalCartAmount, setTotalCartAmount] = useState<number>(0)

  const { data } = useUserCartQuery({
    variables: {
      userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
    },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const totalAmount = data.userCart.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)

      setTotalCartAmount(round(totalAmount, 2))
    },
  })

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
          onClick={noop}
          w="100%"
          fontSize="25px"
          fontWeight="300"
          type="submit"
          form="hook-form"
        >
          Place Order
        </Button>
      </Flex>
    </Flex>
  )
}
