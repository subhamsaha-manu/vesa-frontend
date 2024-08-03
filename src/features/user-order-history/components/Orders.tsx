import React, { FC } from 'react'
import { ContentLayout } from '@/components/Layout'
import { Flex, Text } from '@chakra-ui/react'
import { useUserOrderHistoryQuery } from '../apis/userOrderHistory.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { OrderCard } from './OrderCard'

const Orders: FC = () => {
  const { data, loading: fetchingOrders } = useUserOrderHistoryQuery({
    variables: {
      userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
    },
    fetchPolicy: 'network-only',
  })

  if (fetchingOrders || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <ContentLayout pageTitle="orders" showFullPageScroll>
      <Flex display-name="account-header-section" justify="space-between" w="100%">
        <Text fontSize="md" as="b" color="gray">
          Your Order History
        </Text>
      </Flex>
      <Flex display-name="addresses-section" w="100%" gap={6} pt="30px" flexDir="column">
        {data.userOrderHistory.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </Flex>
    </ContentLayout>
  )
}

export default Orders
