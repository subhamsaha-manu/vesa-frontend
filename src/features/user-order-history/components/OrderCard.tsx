import React, { FC } from 'react'
import { MinifiedOrder } from '@/types'
import { Button, Flex, Text } from '@chakra-ui/react'

type OrderCardProps = {
  readonly order: MinifiedOrder
}
export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  return (
    <Flex display="flex" bg="white" p={4} borderRadius="md" boxShadow="md" justify="space-between">
      <Flex display-name="order-details-section" gap={4}>
        <Flex flexDir="column" gap={4}>
          <Text fontSize="md" fontWeight="bold">
            Order ID
          </Text>
          <Text fontSize="md">{order.orderId}</Text>
        </Flex>
        <Flex flexDir="column" gap={4}>
          <Text fontSize="md" fontWeight="bold">
            Date Placed
          </Text>
          <Text fontSize="md">{order.orderDate}</Text>
        </Flex>
        <Flex flexDir="column" gap={4}>
          <Text fontSize="md" fontWeight="bold">
            Total Amount
          </Text>
          <Text fontSize="md">{`₹ ${order.orderTotal}`}</Text>
        </Flex>
      </Flex>
      <Flex display-name="order-action-buttons-section" align="center">
        <Flex gap={4}>
          <Button
            variant="outline"
            size="md"
            color="black"
            _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          >
            View Order
          </Button>
          <Button
            variant="outline"
            size="md"
            color="black"
            _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          >
            View Invoice
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
