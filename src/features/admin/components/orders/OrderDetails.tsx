import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useOrderDetailsQuery } from '../../apis/orderDetails.generated'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { OrderSummary } from './OrderSummary'
import { useWindowSize } from '@/hooks/useWindowSize'
import { OrderStatusDropdown } from './OrderStatusDropdown'
import { OrderStatus } from '@/types'
import { CheckmarkCircle02Icon } from 'hugeicons-react'
import { Button } from '@nextui-org/react'
import { useUpdateOrderStatusMutation } from '../../apis/updateOrderStatus.generated'
import { orders } from '../../apis/orders'
import { orderDetails } from '../../apis/orderDetails'

type OrderParamType = {
  orderId: string
}
export const OrderDetails: FC = () => {
  const { orderId } = useParams<keyof OrderParamType>() as OrderParamType
  const [orderStatus, setOrderStatus] = useState<OrderStatus | undefined>()

  const { data, loading } = useOrderDetailsQuery({
    variables: {
      orderId,
    },
    fetchPolicy: 'network-only',
  })

  const [updateOrderStatus, { loading: updateOrderStatusLoading }] = useUpdateOrderStatusMutation({
    variables: {
      orderId,
      status: orderStatus!,
    },
    refetchQueries: [{ query: orders }, { query: orderDetails, variables: { orderId } }],
  })

  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  useEffect(() => {
    if (data) {
      setOrderStatus(data.orderDetails.orderStatus)
    }
  }, [data])

  return (
    <Flex
      display-name="oder-details-section"
      w="100%"
      gap={{ base: 4, xl: 6 }}
      p={{ base: '10px', xl: '30px' }}
      flexDir="column"
    >
      <Flex
        display-name="oder-details-header-section"
        w="100%"
        justify="space-between"
        p={{ base: '5px', xl: 0 }}
      >
        <Link to="/admin">
          <IconButton
            aria-label="Back"
            variant="outline"
            size={{ base: 'sm', xl: 'md' }}
            icon={<ArrowBackIcon fontSize={isMobile ? 18 : 22} />}
          />
        </Link>
        <Flex gap={4} align="center">
          <OrderStatusDropdown currentStatus={orderStatus!} onStatusChange={setOrderStatus} />
          {orderStatus !== data?.orderDetails.orderStatus && (
            <Button
              isIconOnly
              aria-label="approve"
              variant="light"
              radius="full"
              onClick={() => void updateOrderStatus()}
              isLoading={updateOrderStatusLoading}
            >
              <CheckmarkCircle02Icon size={24} color="#11a2aa" />
            </Button>
          )}
        </Flex>
      </Flex>
      {loading || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex w="100%" flexDir="column" gap={4} p={{ base: '5px', xl: 0 }}>
          <Heading fontSize={{ base: 'md', xl: 'lg' }} color="#1E355B" fontWeight="700">
            Order Summary
          </Heading>
          <OrderSummary order={data.orderDetails} />
        </Flex>
      )}
    </Flex>
  )
}
