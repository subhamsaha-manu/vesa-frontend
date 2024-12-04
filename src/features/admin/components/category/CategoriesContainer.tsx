import { Flex, Text } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { FC, useState } from 'react'

import { Categories } from './Categories'
import { HeaderActions } from './HeaderActions'

import { useAllCategoriesForAdminQuery } from '../../apis/categories.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { CategoryStatus } from '@/types'

export const CategoriesContainer: FC = () => {
  const [searchText, setSearchText] = useState<string>()

  const onSearchInputChange = debounce((text: string) => {
    if (searchText && text === '') {
      setSearchText(undefined)
    }
    if (text.length > 2) {
      setSearchText(text)
    }
  }, 500)

  const { data, loading } = useAllCategoriesForAdminQuery({
    variables: {
      categoryFilter: {
        statuses: [CategoryStatus.Inactive, CategoryStatus.Draft, CategoryStatus.Published],
        text: searchText,
      },
    },
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
        <HeaderActions setSearchText={onSearchInputChange} />
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
