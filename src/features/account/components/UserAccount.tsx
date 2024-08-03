import { FC } from 'react'
import { ContentLayout } from '@/components/Layout'
import { Flex } from '@chakra-ui/react'
import { Sidebar } from '@/features/account/components/Sidebar'
import { Outlet } from 'react-router-dom'

const UserAccount: FC = () => {
  return (
    <ContentLayout pageTitle="Account" showFullPageScroll>
      <Flex display-name="account-main-flex" w="100%" boxShadow="0 0 8px 0 rgba(0,0,0,0.1)">
        <Flex
          display-name="account-left-section"
          w="250px"
          flexDir="column"
          gap={6}
          minH="567px"
          borderRight="1px solid #f6f6f6"
        >
          <Sidebar />
        </Flex>
        <Flex display-name="account-right-section" flex="1" p="20px">
          <Outlet />
        </Flex>
      </Flex>
    </ContentLayout>
  )
}

export default UserAccount
