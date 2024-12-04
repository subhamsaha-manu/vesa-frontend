import { Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { EditCategoryForm } from './EditCategoryForm'

import { useCategoryQuery } from '../../apis/categoryDetail.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'

type CategoryParamsType = {
  categoryId: string
}

export const EditCategoryContainer: FC = () => {
  const { categoryId } = useParams<keyof CategoryParamsType>() as CategoryParamsType

  const { data, loading } = useCategoryQuery({
    variables: {
      categoryId: categoryId,
    },
    fetchPolicy: 'cache-and-network',
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
          Edit Category - {data?.category.name}
        </Text>
      </Flex>
      {loading || !data ? (
        <SpinnerContainer height="60vh" />
      ) : (
        <Flex
          display-name="edit-category-form-wrapper"
          w="100%"
          gap={6}
          p={{ base: '10px', xl: '30px' }}
          pb="80px !important"
        >
          <EditCategoryForm categoryDetail={data.category} />
        </Flex>
      )}
    </Flex>
  )
}
