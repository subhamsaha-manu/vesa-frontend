import { Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'

import { AddContainerForm } from './AddContainerForm'

import useCategoriesContextProvider from '@/context/CategoriesContextProvider'

export const AddProductContainer: FC = () => {
  const { categories } = useCategoriesContextProvider()

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
          Add Product
        </Text>
      </Flex>

      <Flex
        display-name="add-product-form-wrapper"
        w="100%"
        gap={6}
        p={{ base: '10px', xl: '30px' }}
        pb="80px !important"
      >
        <AddContainerForm categories={categories} />
      </Flex>
    </Flex>
  )
}
