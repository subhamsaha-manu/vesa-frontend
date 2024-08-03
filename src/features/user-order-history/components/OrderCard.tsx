import { FC } from 'react'
import { MinifiedOrder } from '@/types'
import { Flex, Text } from '@chakra-ui/react'

type OrderCardProps = {
  readonly order: MinifiedOrder
}
export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  return (
    <Flex display="flex" bg="white" p={4} borderRadius="md" boxShadow="md">
      <Flex display="order-details-section" gap={4}>
        <Flex flexDir="column">
          <Text fontSize="lg" fontWeight="bold">
            Order ID
          </Text>
          <Text fontSize="lg" fontWeight="">
            {order.orderId}
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Text fontSize="lg" fontWeight="bold">
            Date Placed
          </Text>
          <Text fontSize="lg" fontWeight="">
            {order.orderDate}
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Text fontSize="lg" fontWeight="bold">
            Total Amount
          </Text>
          <Text fontSize="lg" fontWeight="">
            {order.orderTotal}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
