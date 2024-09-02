import React, { FC } from 'react'
import { useProductsQuery } from '../apis/products.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Flex } from '@chakra-ui/react'
import { ProductTile } from './ProductTile'
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
    return <SpinnerContainer height="60vh" />
  }

  return (
    <Flex display-name="products-dashboard-flex" w="100%" h="auto" flexDir="column">
      <Flex display-name="products-container" flexWrap="wrap" justifyContent="space-between">
        {data.products.map((product: Omit<MinifiedProduct, 'quantity' | 'isOutOfStock'>) => (
          <ProductTile product={product} />
        ))}
      </Flex>
    </Flex>
  )
}
