import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useOrderDetailsQuery } from '../apis/orderDetails.generated'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { OrderSummary } from './OrderSummary'
import { useWindowSize } from '@/hooks/useWindowSize'

type OrderParamType = {
  orderId: string
}
export const AdminOrderDetails: FC = () => {
  const { orderId } = useParams<keyof OrderParamType>() as OrderParamType

  const { data, loading } = useOrderDetailsQuery({
    variables: {
      orderId,
    },
    fetchPolicy: 'network-only',
  })

  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  return (
    <Flex
      display-name="oder-details-section"
      w="100%"
      gap={{ base: 4, xl: 6 }}
      pt={{ base: '10px', xl: '30px' }}
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
