import React, { FC } from 'react'
import { useProductsQuery } from '@/features/product/catalogue/apis/products.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Flex, Heading, Wrap, WrapItem } from '@chakra-ui/react'
import { ProductTile } from '@/features/product/catalogue/components/ProductTile'
import { MinifiedProduct } from '@/types'

export const Dashboard: FC = () => {
  const { data, loading } = useProductsQuery({
    variables: {
      productFilter: {},
    },
    fetchPolicy: 'network-only',
  })

  if (loading || !data) {
    return <SpinnerContainer />
  }

  return (
    <Flex display-name="products-dashboard-flex" w="100%" h="auto" flexDir="column" p={10} gap={10}>
      <Flex display-name="content-layout-heading-flex" w="100%" justify="center">
        <Heading size="xl" color="#1E355B" fontWeight="500">
          Our Collection
        </Heading>
      </Flex>
      <Wrap spacing="30px">
        {data.products.map((product: MinifiedProduct) => (
          <WrapItem key={product.productId} maxW="15%" h="565px">
            <ProductTile product={product} />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}
