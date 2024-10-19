import { Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'

import { OrderCard } from './OrderCard'

import { useUserOrderHistoryQuery } from '../apis/userOrderHistory.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'

export const Orders: FC = () => {
  const { data, loading: fetchingOrders } = useUserOrderHistoryQuery({
    fetchPolicy: 'network-only',
  })

  return (
    <Flex w="100%" flexDir="column">
      <Flex
        display-name="orders-header-section"
        justify="space-between"
        w="100%"
        p={{ base: '10px', xl: '0' }}
      >
        <Text fontSize="md" as="b" color="gray">
          Your Order History
        </Text>
      </Flex>
      {fetchingOrders || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex
          display-name="orders-section"
          w="100%"
          gap={6}
          pt={{ base: '10px', xl: '30px' }}
          flexDir="column"
        >
          {data.userOrderHistory.length === 0 && (
            <Text fontSize="md" color="gray">
              No orders found
            </Text>
          )}
          {data.userOrderHistory.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}
