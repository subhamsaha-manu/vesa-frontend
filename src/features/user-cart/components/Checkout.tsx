import { Flex, Heading, Text } from '@chakra-ui/react'
import { FC, useCallback, useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'

import { CartSummary } from './CartSummary'
import { CheckoutForm } from './CheckoutForm'

import { ContentLayout } from '@/components/Layout'
import { AddressListDropdown } from '@/features/user-shipping-address'
import { useWindowSize } from '@/hooks/useWindowSize'

export const Checkout: FC = () => {
  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  const [orderDetails, setOrderDetails] = useState<FieldValues | null>(null)
  const [selectedAddressId, setSelectedAddressId] = useState<string>()
  const orderDetailsRef = useRef(orderDetails)

  const handleFormSubmit = useCallback(async (values: FieldValues) => {
    setOrderDetails(values)
    orderDetailsRef.current = values
  }, [])

  return (
    <ContentLayout pageTitle="checkout">
      <Flex
        display-name="checkout-container"
        w="100%"
        gap={6}
        pt={{ base: '10px', xl: '30px' }}
        flexDir="column"
      >
        <Flex display-name="heading-flex" w="100%" align="center" gap={6}>
          <Flex display-name="heading-flex" align="center">
            <Heading fontSize={{ base: 'md', xl: '2xl' }}>CHECKOUT</Heading>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        gap={6}
        m={{ base: '0 0 30px 0', xl: '30px 0 100px 0' }}
        flexDir={{ base: 'column', xl: 'row' }}
      >
        <Flex
          display-name="checkout-form"
          w={{ base: '100%', xl: 'calc(68% - 30px)' }}
          p={{ base: '10px', xl: '30px' }}
          border="1px solid #e6e6e6"
          flexDir="column"
          gap={6}
        >
          <Flex display-name="billing-form-heading" w="100%" gap={8} align="center">
            <Text fontSize={{ base: 'md', xl: '3xl' }}>Billing Details</Text>
            <AddressListDropdown onSelect={(addressId) => setSelectedAddressId(addressId)} />
          </Flex>
          <CheckoutForm onSubmit={handleFormSubmit} selectedAddressId={selectedAddressId} />
        </Flex>
        <CartSummary orderDetailsRef={orderDetailsRef} />
      </Flex>
    </ContentLayout>
  )
}
