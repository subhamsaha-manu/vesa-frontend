import { Flex, Grid } from '@chakra-ui/react'
import { FC } from 'react'

import { ProductTile } from './ProductTile'

import { useProductsQuery } from '../apis/products.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'

type CatalogueProps = {
  categoryIds?: Array<string>
}

export const Catalogue: FC<CatalogueProps> = ({ categoryIds }) => {
  const { data, loading } = useProductsQuery({
    variables: {
      productFilter: {
        categoryIds,
      },
      pageNumber: 0,
      pageSize: 100,
    },
    fetchPolicy: 'network-only',
  })

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <Flex display-name="products-dashboard-flex" w="100%" h="auto" flexDir="column">
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
        p={4}
      >
        {data.products.products.map((product) => (
          <ProductTile key={product.productId} product={product} />
        ))}
      </Grid>
    </Flex>
  )
}
