import { Flex, Heading, Text } from '@chakra-ui/react'
import { Home01Icon } from 'hugeicons-react'
import { capitalize } from 'lodash'
import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { useWindowSize } from '@/hooks/useWindowSize'

type ContentLayoutProps = {
  pageTitle: string
  children: ReactNode
  showFullPageScroll?: boolean
  showHeaderTitle?: boolean
}

export const ContentLayout: FC<ContentLayoutProps> = ({
  pageTitle,
  children,
  showFullPageScroll,
  showHeaderTitle,
}) => {
  const navigate = useNavigate()

  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  return (
    <>
      <Flex
        display-name="breadcrumb-layout-heading-flex"
        w="100%"
        p={{ base: '15px', xl: '40px 15px 5px 15px' }}
        gap={2}
      >
        <Flex
          onClick={() => navigate('/')}
          _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
          gap={2}
        >
          <Home01Icon size={isMobile ? 18 : 22} color="#000000" />
          <Text fontSize={isMobile ? 'xs' : 'md'} color="gray">
            Home
          </Text>
        </Flex>
        <Text fontSize={isMobile ? 'xs' : 'md'} color="gray">
          {`>`}
        </Text>
        <Text fontSize={isMobile ? 'xs' : 'md'} as="b" color="gray">
          {`${capitalize(pageTitle)}`}
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        p={{ base: '8px', xl: '16px' }}
        pb={{ base: '50px', xl: showFullPageScroll ? '80px' : '16px' }}
        gap={8}
        display-name={`${pageTitle}-content-layout-container`}
        w="100%"
        minH={{ base: 'calc(100vh - 231px)', xl: 'calc(100vh - 231px)' }}
        overflowY={showFullPageScroll ? 'scroll' : 'hidden'}
        style={{
          color: '#485465',
          backgroundColor: '#fff',
          borderRadius: '8px',
          // boxShadow: '0 12px 20px 0 rgba(0,0,0,.05)',
        }}
      >
        {showHeaderTitle && (
          <Flex display-name="content-layout-heading-flex" w="100%" justify="center">
            <Heading size={{ base: 'md', xl: 'lg' }} color="#1E355B" fontWeight="500">
              {pageTitle}
            </Heading>
          </Flex>
        )}
        {children}
      </Flex>
    </>
  )
}
