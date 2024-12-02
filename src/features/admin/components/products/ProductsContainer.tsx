import { Flex, Text } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { FC, useState } from 'react'

import { HeaderActions } from './HeaderActions'
import { Products } from './Products'

import { useAllProductsForAdminQuery } from '../../apis/products.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ProductStatus } from '@/types'

export const ProductsContainer: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [productStatus, setProductStatus] = useState<ProductStatus>()
  const [searchText, setSearchText] = useState<string>()

  const { data, loading } = useAllProductsForAdminQuery({
    variables: {
      productFilter: {
        status: productStatus === ProductStatus.All ? undefined : productStatus,
        text: searchText,
      },
      pageNumber: currentPage,
      pageSize: 20,
    },
    fetchPolicy: 'network-only',
  })

  const onSearchInputChange = debounce((text: string) => {
    if (searchText && text === '') {
      setSearchText(undefined)
    }
    if (text.length > 2) {
      setSearchText(text)
    }
  }, 500)

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
        <HeaderActions setProductStatus={setProductStatus} setSearchText={onSearchInputChange} />
      </Flex>
      {loading || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex
          display-name="admin-all-products-section"
          w="100%"
          gap={6}
          p={{ base: '10px', xl: '20px' }}
          pb="80px !important"
          flexDir="column"
        >
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
