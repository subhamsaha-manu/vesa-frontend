import { Flex, Heading } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Catalogue } from '@/features/product'
import { Categories } from '@/features/category'

export const Dashboard: FC = () => {
  return (
    <Flex flexGrow={1} w="100%" display-name="dashboard-flex" flexDir="column">
      <Categories />
      <Flex display-name="content-layout-heading-flex" w="100%" justify="center">
        <Heading size="xl" color="#1E355B" fontWeight="500">
          Our Collection
        </Heading>
      </Flex>
      <Flex display-name="dashboard-catalogue-wrapper-flex" w="100%" p={{ base: 2, xl: 10 }}>
        <Catalogue />
      </Flex>
    </Flex>
  )
}
