import { Flex, Text } from '@chakra-ui/react'
import { FC, useState } from 'react'

import { Products } from './Products'

import { useAllProductsForAdminQuery } from '../../apis/products.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'

export const ProductsContainer: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)

  const { data, loading } = useAllProductsForAdminQuery({
    variables: {
      productFilter: {},
      pageNumber: currentPage,
      pageSize: 20,
    },
    fetchPolicy: 'network-only',
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
          Products
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
          flexDir="column"
        >
          {data.products.products.length === 0 && (
            <Text fontSize="md" color="gray">
              No products have been added yet!!
            </Text>
          )}
          <Products
            data={data.products.products}
            page={currentPage}
            pages={data.products.pageInfo.totalPages}
            setPage={setCurrentPage}
          />
        </Flex>
      )}
    </Flex>
  )
}
