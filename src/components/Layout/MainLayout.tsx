import { Flex } from '@chakra-ui/react'
import React from 'react'
import { LandingPageHeader } from '@/features/Header'
import { Footer } from '@/features/Footer'

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <LandingPageHeader />
      <Flex w="100%" flexDir="column" h={{ base: '88vh', xl: '88vh' }}>
        <Flex
          display-name="main-layout-flex-container"
          flexDir="column"
          m="0 auto"
          width={{ base: '100%', xl: '1630px' }}
          alignItems="center"
        >
          {children}
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}
