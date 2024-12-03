import { Flex, Text } from '@chakra-ui/react'
import { FC, useState } from 'react'

import { ReceivedOrders } from './ReceivedOrders'

import { useOrdersQuery } from '../../apis/orders.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'

export const ReceivedOrdersContainer: FC = () => {
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
        display-name="admin-orders-header-section"
        justify="space-between"
        w="100%"
        p={{ base: '10px', xl: '30px' }}
        background="white"
        h="80px"
        zIndex={2}
        align="center"
      >
        <Text fontSize="md" as="b">
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
          p={{ base: '10px', xl: '30px' }}
          pb="80px !important"
          flexDir="column"
        >
          {data.orders.orders.length === 0 && (
            <Text fontSize="md" color="gray">
              No orders have been placed yet!!
            </Text>
          )}
          <ReceivedOrders
            data={data.orders.orders}
            page={currentPage}
            pages={data.orders.pageInfo.totalPages}
            setPage={setCurrentPage}
          />
        </Flex>
      )}
    </Flex>
  )
}
