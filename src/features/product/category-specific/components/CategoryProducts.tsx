import React, { FC } from 'react'
import useCategoriesContextProvider from '@/context/CategoriesContextProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { startCase, upperCase } from 'lodash'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { Catalogue } from '@/features/product'

type CategoryParams = {
  categoryName: string
}
export const CategoryProducts: FC = () => {
  const { categories } = useCategoriesContextProvider()

  const navigate = useNavigate()

  const { categoryName } = useParams<keyof CategoryParams>() as CategoryParams

  const transformedCategoryName = startCase(categoryName)

  const categoryId =
    categories.find((category) => category.name === transformedCategoryName)?.categoryId ?? ''

  return (
    <Flex display-name="category-products-flex" flexDir="column" w="100%" maxW="1310px">
      <Flex
        display-name="breadcrumb-layout-heading-flex-category-product"
        w="100%"
        p="5px 0"
        gap={2}
      >
        <Text
          fontSize="md"
          color="gray"
          _hover={{ cursor: 'pointer', 'text-decoration': 'underline' }}
          onClick={() => navigate('/')}
        >
          Home
        </Text>
        <Text fontSize="md" color="gray">
          {`>`}
        </Text>
        <Text fontSize="md" as="b" color="gray">
          {`${transformedCategoryName}`}
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        p={{ base: '8px', xl: '0' }}
        pb={{ base: '150px', xl: '80px' }}
        gap={8}
        display-name={`${transformedCategoryName}-content-layout-container`}
        w="100%"
        h="auto"
        style={{
          color: '#485465',
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}
      >
        <Flex display-name="content-layout-heading-flex" w="100%" justify="start" mt={8}>
          <Heading size="lg" color="#1E355B" fontWeight="500">
            {upperCase(transformedCategoryName)}
          </Heading>
        </Flex>

        <Catalogue categoryIds={[categoryId]} />
      </Flex>
    </Flex>
  )
}
