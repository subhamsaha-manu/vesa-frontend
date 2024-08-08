import React, { FC } from 'react'
import { MinifiedOrder } from '@/types'
import { Button, Flex, Text } from '@chakra-ui/react'
import formatDate from '@/utils/formatDate'
import { Link } from 'react-router-dom'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type OrderCardProps = {
  readonly order: MinifiedOrder
}
export const OrderCard: FC<OrderCardProps> = ({ order: { orderDate, orderId, orderTotal } }) => (
  <Flex display="flex" bg="white" p={4} borderBottom="1px solid #eee" justify="space-between">
    <Flex display-name="order-details-section" gap={4} flexDir="column">
      <Flex gap={2} justify="start" align="end">
        <Text fontSize={{ base: 'sm', xl: 'md' }} fontWeight="bold" lineHeight="18px">
          {`ORD${orderId.substring(0, 8)} . ${INR_CURRENCY_SYMBOL} ${orderTotal}`}
        </Text>
      </Flex>
      <Flex gap={2} color="#666">
        <Text fontSize={{ base: 'xs', xl: 'md' }}>{`Placed on ${formatDate(orderDate)}`}</Text>
      </Flex>
    </Flex>
    <Flex display-name="order-action-buttons-section" align="center">
      <Flex gap={4}>
        <Link to={`/account/orders/${orderId}`}>
          <Button
            variant="outline"
            size={{ base: 'xs', xl: 'sm' }}
            color="black"
            _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          >
            View Details
          </Button>
        </Link>
      </Flex>
    </Flex>
  </Flex>
)
