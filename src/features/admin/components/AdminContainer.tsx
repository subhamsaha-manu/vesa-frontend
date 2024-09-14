import { FC } from 'react'
import { ErrorFallback } from '@/components/Layout'
import { Flex } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

const AdminContainer: FC = () => {
  return (
    <Flex display-name="admin-container-flex" w="100%" p={{ base: '0', xl: '0' }}>
      <Flex
        display-name="admin-sidebar"
        w={{ base: '100%', xl: '250px' }}
        flexDir="column"
        gap={6}
        minH={{ base: 'auto', xl: '567px' }}
        borderRight="1px solid #f6f6f6"
      >
        <Sidebar />
      </Flex>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Flex
          display-name="admin-account-right-section"
          flex="1"
          background="#f9f7f7"
          h="900px"
          overflowY="scroll"
        >
          <Outlet />
        </Flex>
      </ErrorBoundary>
    </Flex>
  )
}

export default AdminContainer
