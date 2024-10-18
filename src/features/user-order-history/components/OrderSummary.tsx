import React, { FC } from 'react'
import { Order, OrderItem } from '@/types'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { capitalize } from 'lodash'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'
import round from 'lodash/round'

type OrderSummaryProps = {
  order: Order
}
export const OrderSummary: FC<OrderSummaryProps> = ({ order }) => {
  return (
    <Flex w="100%" flexDir="column" gap={4} p={{ base: 0, xl: 4 }}>
      <Flex w="100%" gap={{ base: 2, xl: 6 }} justify="space-evenly">
        <Flex flex="1" flexDirection="column" gap={{ base: 2, xl: 4 }}>
          <Text fontSize="sm" as="b">
            Shipping Address
          </Text>
          <Flex flexDir="column">
            <Text fontSize="sm">{order.name}</Text>
            <Text fontSize="sm">{order.addressLine1}</Text>
            <Text fontSize="sm">{order.addressLine2}</Text>
            <Text fontSize="sm">{order.city}</Text>
            <Text fontSize="sm">{order.state}</Text>
            <Text fontSize="sm">{order.pincode}</Text>
          </Flex>
        </Flex>
        <Flex flex="1" flexDirection="column" gap={4}>
          <Text fontSize="sm" as="b">
            Payment Method
          </Text>
          <Flex flexDir="column">
            <Text fontSize="sm">{capitalize(order.modeOfPayment).replace('_', '-')}</Text>
          </Flex>
        </Flex>
        <Flex flex=".5" flexDirection="column" gap={4}>
          <Text fontSize="sm" as="b">
            Total
          </Text>
          <Flex flexDir="column">
            <Text fontSize="sm">{`${INR_CURRENCY_SYMBOL} ${round(order.orderTotal, 2)}`}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Text fontSize="md" color="#666" as="b">
        {order.orderItems.length} item(s) in this order
      </Text>
      <Flex flexDir="column" gap={4}>
        {order.orderItems.map((item) => (
          <ProductItem key={item.productId} {...item} />
        ))}
      </Flex>
    </Flex>
  )
}

const ProductItem = ({ productId, title, imageUrl, price, quantity }: OrderItem) => {
  const navigate = useNavigate()

  return (
    <Flex
      display="flex"
      bg="white"
      p={{ base: '5px 0', xl: 4 }}
      borderBottom="1px solid #eee"
      gap={6}
    >
      <Flex>
        <Image src={imageUrl} alt={title} width="100px" height="100px" />
      </Flex>
      <Flex display-name="order-details-section" gap={4} flexDir="column">
        <Flex gap={2} justify="start" align="end">
          <Text fontSize="md" fontWeight="bold" lineHeight="18px">
            {title}
          </Text>
        </Flex>
        <Flex gap={2} color="#666">
          <Text fontSize="md">{`${INR_CURRENCY_SYMBOL} ${price} x ${quantity}`}</Text>
        </Flex>
        <Button
          variant="solid"
          size="xs"
          color="white"
          background="#11a2aa"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="20px"
          onClick={() => navigate(`/product/${productId}`)}
          w="150px"
        >
          Buy it Again
        </Button>
      </Flex>
    </Flex>
  )
}
