import { Flex } from '@chakra-ui/react'
import React from 'react'
import { LandingPageHeader } from '@/features/Header'

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <LandingPageHeader />
      <Flex
        display-name="main-layout-flex-container"
        flexDir="column"
        h={{ base: '80vh', xl: '80vh' }}
        m="0 auto"
        width={{ base: '100%', xl: '1136px' }}
        alignItems="center"
      >
        {children}
      </Flex>
    </>
  )
}
