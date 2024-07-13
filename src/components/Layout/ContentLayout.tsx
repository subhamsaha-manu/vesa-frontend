import { Flex, Heading, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type ContentLayoutProps = {
  pageTitle: string
  children: ReactNode
  showFullPageScroll?: boolean
}
export const ContentLayout: React.FC<ContentLayoutProps> = ({
  pageTitle,
  children,
  showFullPageScroll,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Flex display-name="breadcrumb-layout-heading-flex" w="100%" p="5px 15px" gap={2}>
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
          {`${pageTitle}`}
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        p={{ base: '8px', xl: '16px' }}
        pb={{ base: '150px', xl: showFullPageScroll ? '80px' : '16px' }}
        gap={8}
        display-name={`${pageTitle}-content-layout-container`}
        // w={{ base: '100%', xl: '87%' }}
        w="100%"
        h="auto"
        // overflowY={showFullPageScroll ? 'scroll' : 'hidden'}
        style={{
          color: '#485465',
          backgroundColor: '#fff',
          borderRadius: '8px',
          // boxShadow: '0 12px 20px 0 rgba(0,0,0,.05)',
        }}
      >
        <Flex display-name="content-layout-heading-flex" w="100%" justify="center">
          <Heading size="xl" color="#1E355B" fontWeight="500">
            {pageTitle}
          </Heading>
        </Flex>

        {children}
      </Flex>
    </>
  )
}
