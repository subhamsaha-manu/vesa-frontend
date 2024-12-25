import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { FC } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'

import { OrderSummary } from './OrderSummary'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { useOrderDetailsQuery } from '@/features/user-order-history/apis/orderDetails.generated'
import { useWindowSize } from '@/hooks/useWindowSize'

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
        <Link to="/account/orders">
          <IconButton aria-label="Back" variant="outline" size={{ base: 'sm', xl: 'md' }}>
            <IoIosArrowBack fontSize={isMobile ? 18 : 22} />
          </IconButton>
        </Link>
      </Flex>
      {loading || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex w="100%" flexDir="column" gap={4} p={{ base: '5px', xl: 0 }}>
          <Heading fontSize={{ base: 'sm', xl: 'md' }} color="#1E355B" fontWeight="700">
            Order Summary
          </Heading>
          <OrderSummary order={data.orderDetails} />
        </Flex>
      )}
    </Flex>
  )
}
