import { FC } from 'react'
import { ContentLayout, ErrorFallback } from '@/components/Layout'
import { Flex } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

const UserAccount: FC = () => {
  return (
    <ContentLayout pageTitle="Account" showFullPageScroll>
      <Flex
        display-name="account-main-flex"
        w="100%"
        boxShadow="0 0 8px 0 rgba(0,0,0,0.1)"
        flexDir={{ base: 'column', xl: 'row' }}
        gap={{ base: 6, xl: 0 }}
      >
        <Flex
          display-name="account-left-section"
          w={{ base: '100%', xl: '250px' }}
          flexDir="column"
          gap={6}
          minH={{ base: 'auto', xl: '567px' }}
          borderRight="1px solid #f6f6f6"
        >
          <Sidebar />
        </Flex>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Flex display-name="account-right-section" flex="1" p={{ base: '0', xl: '10px' }}>
            <Outlet />
          </Flex>
        </ErrorBoundary>
      </Flex>
    </ContentLayout>
  )
}

export default UserAccount
