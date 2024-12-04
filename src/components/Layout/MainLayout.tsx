import { Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

import { Footer } from '@/features/Footer'
import { LandingPageHeader } from '@/features/Header'

type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" display-name="main-layout-flex">
      <LandingPageHeader />
      <Flex
        flex="1"
        w="100%"
        flexDir="column"
        overflowY="auto"
        maxH={{ base: 'calc(100vh - 60px)', xl: 'calc(100vh - 120px)' }}
        display-name="main-layout-flex-2"
        id="main-layout-flex-2"
        gap="24px"
      >
        <Flex
          w="100%"
          m="0 auto"
          flex={1}
          justify="center"
          align="flex-start"
          display-name="main-layout-flex-3"
          flexDir="column"
          p={{ base: '0 4px', xl: '0' }}
        >
          {children}
        </Flex>
        <Footer />
      </Flex>
    </Flex>
  )
}
