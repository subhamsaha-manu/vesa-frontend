import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { capitalize } from 'lodash'
import round from 'lodash/round'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Order, OrderItem } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type OrderSummaryProps = {
  order: Order
}
export const OrderSummary: FC<OrderSummaryProps> = ({ order }) => {
  return (
    <Flex w="100%" flexDir="column" gap={4} p={{ base: 0, xl: 4 }}>
      <Flex w="100%" gap={{ base: 2, xl: 6 }} justify="space-evenly">
        <Flex flex="1" flexDirection="column" gap={{ base: 2, xl: 4 }}>
          <Text fontSize="md" as="b">
            Shipping Address
          </Text>
          <Flex flexDir="column">
            <Text fontSize="md">{order.name}</Text>
            <Text fontSize="md">{order.addressLine1}</Text>
            <Text fontSize="md">{order.addressLine2}</Text>
            <Text fontSize="md">{order.city}</Text>
            <Text fontSize="md">{order.state}</Text>
            <Text fontSize="md">{order.pincode}</Text>
          </Flex>
        </Flex>
        <Flex flex="1" flexDirection="column" gap={{ base: 2, xl: 4 }}>
          <Text fontSize="md" as="b">
            Contact Details
          </Text>
          <Flex flexDir="column" gap={4}>
            <Flex gap={4}>
              <Text fontSize="md" as="b">
                Phone
              </Text>
              <Text fontSize="md">{order.phone}</Text>
            </Flex>
            <Flex gap={4}>
              <Text fontSize="md" as="b">
                Email
              </Text>
              <Text fontSize="md">{order.email}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex flex="1" flexDirection="column" gap={4}>
          <Text fontSize="md" as="b">
            Payment Method
          </Text>
          <Flex flexDir="column">
            <Text fontSize="md">{capitalize(order.modeOfPayment).replace('_', '-')}</Text>
          </Flex>
        </Flex>
        <Flex flex=".5" flexDirection="column" gap={4}>
          <Text fontSize="md" as="b">
            Total
          </Text>
          <Flex flexDir="column">
            <Text fontSize="md">{`${INR_CURRENCY_SYMBOL} ${round(order.orderTotal, 2)}`}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Text fontSize="lg" color="#666" as="b">
        {order.orderItems.length} item(s) in this order
      </Text>
      <Flex flexDir="column" gap={4} display-name="ordered-items" h="400px" overflowY="scroll">
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
        <Image src={imageUrl} alt={title} width="200px" height="200px" />
      </Flex>
      <Flex display-name="order-details-section" gap={4} flexDir="column">
        <Flex gap={2} justify="start" align="end">
          <Text fontSize="lg" fontWeight="bold" lineHeight="18px">
            {title}
          </Text>
        </Flex>
        <Flex gap={2} color="#666">
          <Text
            fontSize="md"
            fontWeight="bold"
          >{`${INR_CURRENCY_SYMBOL} ${price} x ${quantity}`}</Text>
        </Flex>
        <Button
          variant="solid"
          size="md"
          color="white"
          background="#11a2aa"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="20px"
          onClick={() => navigate(`/product/${productId}`)}
          w="150px"
        >
          View Product
        </Button>
      </Flex>
    </Flex>
  )
}
