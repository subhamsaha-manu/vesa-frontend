import React, { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { useUserOrderHistoryQuery } from '../apis/userOrderHistory.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { OrderCard } from './OrderCard'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'

export const Orders: FC = () => {
  const {
    currentUser: { userId },
  } = useCurrentUserContext()

  const { data, loading: fetchingOrders } = useUserOrderHistoryQuery({
    variables: {
      userId,
    },
    fetchPolicy: 'network-only',
  })

  return (
    <Flex w="100%" flexDir="column">
      <Flex display-name="orders-header-section" justify="space-between" w="100%">
        <Text fontSize="md" as="b" color="gray">
          Your Order History
        </Text>
      </Flex>
      {fetchingOrders || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex display-name="orders-section" w="100%" gap={6} pt="30px" flexDir="column">
          {data.userOrderHistory.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}
