import React, { FC } from 'react'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { CheckoutForm } from './CheckoutForm'
import noop from 'lodash/noop'

export const Checkout: FC = () => {
  const navigate = useNavigate()

  return (
    <Flex display-name="checkout-flex" flexDir="column" w="100%" maxW="1310px">
      <Flex display-name="breadcrumb-layout-heading-flex-user-cart" w="100%" p="5px 0" gap={2}>
        <Text
          fontSize="md"
          color="gray"
          _hover={{ cursor: 'pointer', 'text-decoration': 'underline' }}
          onClick={() => navigate('/')}
        >
          Home
        </Text>
        <Text fontSize="md" color="gray">
          {`>`}
        </Text>
        <Text fontSize="md" as="b" color="gray">
          Checkout
        </Text>
      </Flex>
      <Flex display-name="main-cart-section" w="100%" gap={6} pt="30px" flexDir="column">
        <Flex display-name="heading-flex" w="100%" align="center" gap={6}>
          <Flex display-name="heading-flex" align="center">
            <Heading fontSize="2xl">CHECKOUT</Heading>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100%" gap={6} m="30px 0 100px 0">
        <Flex
          display-name="checkout-form"
          w="calc(68% - 30px)"
          p="30px"
          border="1px solid #e6e6e6"
          flexDir="column"
          gap={6}
        >
          <Flex display-name="billing-form-heading" w="100%">
            <Text fontSize="3xl">Billing Details</Text>
          </Flex>
          <CheckoutForm />
        </Flex>
        <Flex
          display-name="cart-summary"
          w="32%"
          h="358px"
          background="#f2f2f2"
          p={7}
          flexDir="column"
          gap={6}
          mb="100px"
        >
          <Heading>Your Order</Heading>
          <Flex flexDir="column">
            <Flex
              display-name="subtotal"
              justify="space-between"
              p="15px 0"
              borderBottom="1px solid #e6e6e6"
            >
              <Text>Subtotal</Text>
              <Text>{`₹ 10`}</Text>
            </Flex>
            <Flex display-name="total" justify="space-between" p="15px 0">
              <Text>Total</Text>
              <Text fontSize="3xl">{`₹ 10`}</Text>
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
      </Flex>
    </Flex>
  )
}
