import { Flex, Grid } from '@chakra-ui/react'
import { FC, useCallback, useEffect, useState } from 'react'

import { ProductTile } from './ProductTile'

import { useProductsQuery } from '../apis/products.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { MinifiedProduct, ProductStatus } from '@/types'

type CatalogueProps = {
  categoryIds?: Array<string>
}

export const Catalogue: FC<CatalogueProps> = ({ categoryIds }) => {
  const [pageNumber, setPageNumber] = useState(0)
  const [products, setProducts] = useState<
    Array<Omit<MinifiedProduct, 'id' | 'quantity' | 'status'>>
  >([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [totalPages, setTotalPages] = useState<number>(0)

  const { data, loading, fetchMore } = useProductsQuery({
    variables: {
      productFilter: {
        categoryIds,
        statuses: [ProductStatus.Published],
      },
      pageNumber,
      pageSize: 20,
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data && data.products) {
      setProducts((prev) => [...prev, ...data.products.products])
      setTotalPages(data.products.pageInfo.totalPages)

      setHasMore(data.products.pageInfo.currentPage < data.products.pageInfo.totalPages - 1)
    }
  }, [data])

  const loadMore = useCallback(() => {
    if (!loading && hasMore && pageNumber + 1 < totalPages) {
      void fetchMore({
        variables: {
          pageNumber: pageNumber + 1,
        },
      })
      setPageNumber((prev) => prev + 1)
    }
  }, [loading, hasMore, pageNumber, totalPages])

  const observer = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          intersectionObserver.disconnect()
          loadMore()
        }
      })
      if (node) intersectionObserver.observe(node)
    },
    [loading, loadMore]
  )

  if (!products.length && loading) {
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
      >
        {products.map((product) => (
          <ProductTile key={product.productId} product={product} />
        ))}
      </Grid>
      {hasMore && (
        <div ref={observer}>
          <SpinnerContainer height="40px" />
        </div>
      )}
    </Flex>
  )
}
