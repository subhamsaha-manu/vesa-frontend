import { Heading, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

import { ContentLayout } from '@/components/Layout/ContentLayout'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'

export const Dashboard = () => {
  const [activeTileId, setActiveTileId] = useState<string>('')

  const { currentUser } = useCurrentUserContext()
  const { name } = currentUser!

  return (
    <ContentLayout pageTitle="">
      <VStack
        display-name="dashboard-container"
        h="77vh"
        overflow="scroll"
        w="100%"
        alignItems="start"
        spacing={8}
      >
        <Heading size="sm">Hi welcome back {name}</Heading>
      </VStack>
    </ContentLayout>
  )
}
