import { Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'

import { AddCategoryForm } from './AddCategoryForm'

export const AddCategoryContainer: FC = () => {
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
          Add Category
        </Text>
      </Flex>

      <Flex
        display-name="add-category-form-wrapper"
        w="100%"
        gap={6}
        p={{ base: '10px', xl: '30px' }}
        pb="80px !important"
      >
        <AddCategoryForm />
      </Flex>
    </Flex>
  )
}
