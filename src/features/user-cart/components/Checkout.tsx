import React, { FC, useCallback, useRef, useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { CheckoutForm } from './CheckoutForm'
import { CartSummary } from './CartSummary'
import { FieldValues } from 'react-hook-form'
import { ContentLayout } from '@/components/Layout'
import { AddressListDropdown } from '@/features/user-shipping-address'

export const Checkout: FC = () => {
  const navigate = useNavigate()

  const [orderDetails, setOrderDetails] = useState<FieldValues | null>(null)
  const [selectedAddressId, setSelectedAddressId] = useState<string>()
  const orderDetailsRef = useRef(orderDetails)

  const handleFormSubmit = useCallback(async (values: FieldValues) => {
    setOrderDetails(values)
    orderDetailsRef.current = values
  }, [])

  return (
    <ContentLayout pageTitle="checkout">
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
          <Flex display-name="billing-form-heading" w="100%" justify="space-between" align="center">
            <Text fontSize="3xl">Billing Details</Text>
            <AddressListDropdown onSelect={(addressId) => setSelectedAddressId(addressId)} />
          </Flex>
          <CheckoutForm onSubmit={handleFormSubmit} selectedAddressId={selectedAddressId} />
        </Flex>
        <CartSummary orderDetailsRef={orderDetailsRef} />
      </Flex>
    </ContentLayout>
  )
}
