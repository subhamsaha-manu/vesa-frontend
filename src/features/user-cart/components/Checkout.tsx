import React, { FC, useCallback, useRef, useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { CheckoutForm } from './CheckoutForm'
import { CartSummary } from './CartSummary'
import { FieldValues } from 'react-hook-form'

export const Checkout: FC = () => {
  const navigate = useNavigate()

  const [orderDetails, setOrderDetails] = useState<FieldValues | null>(null)
  const orderDetailsRef = useRef(orderDetails)

  const handleFormSubmit = useCallback(async (values: FieldValues) => {
    setOrderDetails(values)
    orderDetailsRef.current = values
  }, [])

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
          <CheckoutForm onSubmit={handleFormSubmit} />
        </Flex>
        <CartSummary orderDetailsRef={orderDetailsRef} />
      </Flex>
    </Flex>
  )
}
