import React, { FC } from 'react'
import useCategoriesContextProvider from '@/context/CategoriesContextProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { startCase, upperCase } from 'lodash'
import { Flex, Heading } from '@chakra-ui/react'
import { Catalogue } from '@/features/product'
import { ContentLayout } from '@/components/Layout'

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
    <ContentLayout pageTitle={`${transformedCategoryName}`}>
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
    </ContentLayout>
  )
}
