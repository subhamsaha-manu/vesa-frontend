import { Flex } from '@chakra-ui/layout'
import React, { FC, ReactNode } from 'react'

import { Footer } from '@/features/Footer'
import { LandingPageHeader } from '@/features/Header'

type LandingLayoutProps = {
  children: ReactNode
  page: string
}
export const LandingLayout: FC<LandingLayoutProps> = ({ children, page }: LandingLayoutProps) => {
  return (
    <>
      <LandingPageHeader />
      <Flex
        direction="column"
        align="center"
        //maxW={{ xl: '1200px' }}
        minH="85vh"
        m="0 auto"
        display-name={`container-for-${page}`}
      >
        {children}
      </Flex>
      <Footer />
    </>
  )
}
