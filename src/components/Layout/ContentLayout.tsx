import { Container, Flex, Heading } from '@chakra-ui/react'
import React from 'react'

type ContentLayoutProps = {
  pageTitle: string
  children: React.ReactNode
}
export const ContentLayout: React.FC<ContentLayoutProps> = ({ pageTitle, children }) => {
  return (
    <Container
      display-name={`${pageTitle}-content-layout-container`}
      data-testid={pageTitle}
      maxW="100%"
      h={{ base: '77vh', md: '85vh' }}
      overflow="auto"
      p={{ base: 2, md: 8 }}
      zIndex="3"
      borderRadius="2%"
    >
      <Flex display-name="content-layout-heading-flex" w="100%">
        <Heading size="xl" color="#1E355B">
          {pageTitle}
        </Heading>
      </Flex>

      {children}
    </Container>
  )
}
