import { CloseIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton, Stack, Text, Tooltip, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { ChooseGameModeButton } from './ChooseGameModeButton'
import { CompetingUsersContainer } from './CompetingUsersContainer'
import { HandleChallenges } from './HandleChallenges'

import { useGetAllOtherLoggedInUsersQuery } from '../apis/getAllOtherLoggedInUsers.generated'

import { DropdownItemsType, SearchableComponent } from '@/components/elements/Searchable'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout'
import { InviteAndChallengeFriend } from '@/features/gameMode/components/InviteAndChallengeFriend'
import { User } from '@/types'

export const PlayWithFriend: React.FC = () => {
  const navigate = useNavigate()

  const [items, setItems] = useState<Array<DropdownItemsType>>([])
  const [users, setUsers] = useState<Array<Omit<User, 'email' | 'score' | 'roles'>>>([])
  const [selectedUser, setSelectedUser] = useState<Omit<User, 'email' | 'score' | 'roles'>>()

  const { data: allOtherLoggedInUsers, loading: allOtherLoggedInUsersLoading } =
    useGetAllOtherLoggedInUsersQuery({
      fetchPolicy: 'network-only',
    })

  useEffect(() => {
    if (allOtherLoggedInUsers) {
      setItems(
        allOtherLoggedInUsers.getAllOtherLoggedInUsers.map((item) => {
          const { uuid, name } = item
          return { value: uuid, label: name }
        })
      )
      setUsers(allOtherLoggedInUsers.getAllOtherLoggedInUsers)
    }
  }, [allOtherLoggedInUsers, allOtherLoggedInUsers?.getAllOtherLoggedInUsers])

  if (allOtherLoggedInUsersLoading || !allOtherLoggedInUsers?.getAllOtherLoggedInUsers) {
    return <SpinnerContainer height="60vh" />
  }

  const handleUserSelection = (selectedUserUuid: string) => {
    const selectedUser = users.find((user) => user.uuid === selectedUserUuid)!
    setSelectedUser(selectedUser)
  }

  const ActionButton: JSX.Element = (
    <Tooltip label="Change user" hasArrow fontSize="md">
      <IconButton
        aria-label="Change user"
        colorScheme="red"
        variant="outline"
        icon={<CloseIcon boxSize={{ base: 4, md: 6 }} />}
        onClick={() => setSelectedUser(undefined)}
      />
    </Tooltip>
  )

  return (
    <>
      <ContentLayout pageTitle="">
        <VStack
          h="100%"
          w="100%"
          display-name="competing-users-vstack"
          spacing={{ base: 5, md: 20 }}
          display={selectedUser ? 'none' : 'flex'}
        >
          <ChooseGameModeButton />
          <Stack
            display-name="play-with-friend-container"
            flexDir={{ base: 'column', md: 'row' }}
            alignItems="center"
            justifyContent="center"
            h="77vh"
            overflow="scroll"
            gap="40px"
          >
            <VStack
              display-name="play-with-friend-vstack"
              w={{ base: '100%', md: '50%' }}
              alignItems="center"
              justifyContent="center"
              spacing={10}
            >
              <VStack display-name="select-user-container" spacing={4}>
                <Flex direction="column" align="center">
                  <Text as="label" fontSize="2xl">
                    Choose from an online user
                  </Text>
                  <SearchableComponent
                    items={items}
                    selectedItem={selectedUser?.uuid}
                    onSelectionChange={handleUserSelection}
                  />
                </Flex>
              </VStack>
            </VStack>
            <Flex display-name="or-text-container">
              <Heading size="xl" color="#1774aa" fontStyle="italic">
                OR
              </Heading>
            </Flex>
            <VStack
              display-name="invite-and-challenge-vstack"
              w={{ base: '100%', md: '50%' }}
              alignItems="center"
              justifyContent="center"
              spacing={10}
            >
              <Flex
                direction="column"
                align="center"
                display-name="invite-and-challenge-flex"
                justify="center"
                h="100%"
              >
                <Text as="label" fontSize="2xl" alignSelf="flex-start">
                  Challenge and Invite Friend
                </Text>
                <InviteAndChallengeFriend />
              </Flex>
            </VStack>
          </Stack>
        </VStack>
        {selectedUser && (
          <CompetingUsersContainer
            secondUser={selectedUser}
            loading={false}
            actionButton={ActionButton}
          />
        )}
      </ContentLayout>

      <HandleChallenges
        sendingChallengeModalIsOpen={false}
        sentChallengeId=""
        toUserUuid=""
        toUserName=""
      />
    </>
  )
}
