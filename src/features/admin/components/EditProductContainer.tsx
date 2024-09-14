import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useProductDetailQuery } from '../apis/productDetail.generated'
import { Flex, Text } from '@chakra-ui/react'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { EditContainerForm } from './EditContainerForm'

type ProductParamType = {
  productId: string
}

export const EditProductContainer: FC = () => {
  const { productId } = useParams<keyof ProductParamType>() as ProductParamType

  const { data, loading } = useProductDetailQuery({
    variables: {
      productId,
    },
  })

  return (
    <Flex w="100%" flexDir="column" display-name="admin-products-container">
      <Flex
        display-name="admin-products-header-section"
        justify="space-between"
        w="100%"
        p={{ base: '10px', xl: '20px' }}
        background="white"
        h="80px"
        zIndex={2}
        align="center"
      >
        <Text fontSize="md" as="b">
          Edit Product - {data?.product.title}
        </Text>
      </Flex>
      {loading || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex
          display-name="admin-all-products-section"
          w="100%"
          gap={6}
          p={{ base: '10px', xl: '30px' }}
          pb="80px !important"
        >
          <EditContainerForm categories={data.categories} productDetail={data.product} />
        </Flex>
      )}
    </Flex>
  )
}
