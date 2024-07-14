import React, { FC } from 'react'
import { useProductsQuery } from '@/features/product/catalogue/apis/products.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Flex } from '@chakra-ui/react'
import { ProductTile } from '@/features/product/catalogue/components/ProductTile'
import { MinifiedProduct } from '@/types'

type CatalogueProps = {
  categoryIds?: Array<string>
}
export const Catalogue: FC<CatalogueProps> = ({ categoryIds }) => {
  const { data, loading } = useProductsQuery({
    variables: {
      productFilter: {
        categoryIds,
      },
    },
    fetchPolicy: 'network-only',
  })

  if (loading || !data) {
    return <SpinnerContainer />
  }

  return (
    <Flex display-name="products-dashboard-flex" w="100%" h="auto" flexDir="column" gap={10}>
      <Flex display-name="products-container" flexWrap="wrap" justifyContent="space-between">
        {data.products.map((product: MinifiedProduct) => (
          <ProductTile product={product} />
        ))}
      </Flex>
    </Flex>
  )
}
