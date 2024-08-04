import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useOrderDetailsQuery } from '@/features/user-order-history/apis/orderDetails.generated'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { OrderSummary } from './OrderSummary'

type OrderParamType = {
  orderId: string
}
export const OrderDetails: FC = () => {
  const { orderId } = useParams<keyof OrderParamType>() as OrderParamType

  const { data, loading } = useOrderDetailsQuery({
    variables: {
      orderId,
    },
    fetchPolicy: 'network-only',
  })

  return (
    <Flex display-name="oder-details-section" w="100%" gap={6} pt="30px" flexDir="column">
      <Flex display-name="oder-details-header-section" w="100%" justify="space-between">
        <Link to="/account/orders">
          <IconButton
            aria-label="Back"
            variant="outline"
            size="lg"
            icon={<ArrowBackIcon fontSize={22} />}
          />
        </Link>
      </Flex>
      {loading || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex w="100%" flexDir="column" gap={4}>
          <Heading size="md" color="#1E355B" fontWeight="700">
            Order Summary
          </Heading>
          <OrderSummary order={data.orderDetails} />
        </Flex>
      )}
    </Flex>
  )
}
