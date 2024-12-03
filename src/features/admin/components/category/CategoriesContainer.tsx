import { Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'

import { HeaderActions } from './HeaderActions'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { useAllCategoriesForAdminQuery } from '@/features/admin/apis/categories.generated'
import { Categories } from '@/features/admin/components/category/Categories'

export const CategoriesContainer: FC = () => {
  const { data, loading } = useAllCategoriesForAdminQuery({
    fetchPolicy: 'network-only',
  })

  return (
    <Flex w="100%" flexDir="column" display-name="admin-categories-container">
      <Flex
        display-name="admin-categories-header-section"
        justify="space-between"
        w="100%"
        p={{ base: '10px', xl: '20px' }}
        background="white"
        h="80px"
        zIndex={2}
        align="center"
      >
        <Text fontSize="md" as="b">
          Categories
        </Text>
        <HeaderActions />
      </Flex>
      {loading || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex
          display-name="admin-all-categories-section"
          w="100%"
          gap={6}
          p={{ base: '10px', xl: '20px' }}
          pb="80px !important"
          flexDir="column"
        >
          <Categories data={data.categories} />
        </Flex>
      )}
    </Flex>
  )
}
