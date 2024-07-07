import { RepeatIcon } from '@chakra-ui/icons'
import { IconButton, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { CompetingUsersContainer } from './CompetingUsersContainer'
import { NoOnlineUserFound } from './NoOnlineUserFound'

import { useGetAnotherLoggedInUserLazyQuery } from '../apis/getAnotherLoggedInUser.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout'

export const PlayWithRandomOnlineUser: React.FC = () => {
  const [getAnotherLoggedInUser, { data: anotherUser, loading }] =
    useGetAnotherLoggedInUserLazyQuery({
      fetchPolicy: 'network-only',
    })

  const { onClose } = useDisclosure()

  useEffect(() => {
    getAnotherLoggedInUser()
  }, [])

  if (loading) {
    return <SpinnerContainer height="60vh" />
  }

  if (!anotherUser?.getAnotherLoggedInUser) {
    return <NoOnlineUserFound isOpen={true} onClose={onClose} />
  }

  const ActionButton: JSX.Element = (
    <Tooltip label="Randomize user" hasArrow fontSize="md">
      <IconButton
        aria-label="Change user"
        variant="outline"
        icon={<RepeatIcon boxSize={6} />}
        onClick={() => getAnotherLoggedInUser()}
      />
    </Tooltip>
  )

  return (
    <ContentLayout pageTitle="">
      <VStack
        display-name="play-with-random-online-user-container"
        h={{ base: 'null', md: '100%' }}
        w="100%"
        alignItems="center"
        justifyContent="center"
        spacing={10}
      >
        <CompetingUsersContainer
          actionButton={ActionButton}
          secondUser={anotherUser.getAnotherLoggedInUser}
          loading={loading}
        />
      </VStack>
    </ContentLayout>
  )
}
