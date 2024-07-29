import { Flex } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthenticationContext } from '@/features/auth'
import { storage } from '@/utils/storage'
import { Dashboard } from '@/features/dashboard'

export const LandingContent: FC = () => {
  const location = useLocation()

  const navigate = useNavigate()
  const incomingPath: string = location.pathname
  const { isAuthenticated } = useAuthenticationContext()

  useEffect(() => {
    if (incomingPath.includes('/challenge/')) {
      const url = `${incomingPath}${location.search}`

      navigate('/auth/login')
      storage.setItem('INCOMING_PATH', url)
    }
  }, [incomingPath, location.search, navigate])

  return (
    // <Container maxW="5xl">
    //   <Image src={img} />
    // </Container>
    <Flex
      flexGrow={1}
      w="100%"
      justifyContent="center"
      alignItems="center"
      display-name="landing-content-flex"
      h={{ base: 'calc(100vh - 60px)', md: 'calc(100vh - 120px)' }}
      overflow="scroll"
    >
      <Dashboard />
    </Flex>
  )
}
