import React, { FC, useState } from 'react'
import { useOrdersQuery } from '../apis/orders.generated'
import { Flex, Text } from '@chakra-ui/react'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { ReceivedOrders } from './ReceivedOrders'
import { Pagination } from './Pagination'

export const AdminDashboard: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)

  const { data, loading } = useOrdersQuery({
    variables: {
      pageNumber: 0,
      pageSize: 10,
    },
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
          All Received Orders
        </Text>
      </Flex>
      {loading || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex
          display-name="admin-orders-section"
          w="100%"
          gap={6}
          pt={{ base: '10px', xl: '30px' }}
          flexDir="column"
        >
          {data.orders.orders.length === 0 && (
            <Text fontSize="md" color="gray">
              No orders have been placed yet!!
            </Text>
          )}
          <ReceivedOrders data={data.orders.orders} />
          <Pagination
            totalPages={data.orders.pageInfo.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Flex>
      )}
    </Flex>
  )
}
