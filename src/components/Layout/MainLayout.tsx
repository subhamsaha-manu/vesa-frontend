import { Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

import { Footer } from '@/features/Footer'
import { LandingPageHeader } from '@/features/Header'

type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <LandingPageHeader />
      <Flex w="100%" flexDir="column" h={{ base: '88vh', xl: '88vh' }}>
        <Flex
          display-name="main-layout-flex-container"
          flexDir="column"
          m="0 auto"
          width={{ base: '100%' }}
          alignItems="center"
        >
          {children}
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}
