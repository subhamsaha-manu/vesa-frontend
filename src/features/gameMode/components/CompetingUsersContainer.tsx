import { StarIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { truncate } from 'lodash'
import React from 'react'
import { useNavigate } from 'react-router'

import { ChooseGameModeButton } from './ChooseGameModeButton'
import { StartGameButton } from './StartGameButton'

import user01 from '@/assets/illustrations/user01.png'
import user02 from '@/assets/illustrations/user02.png'
import versusImg from '@/assets/versus.png'
import { useCurrentUserContext } from '@/features/auth'
import * as Types from '@/types'

type CompetingUsersContainerProps = {
  actionButton: JSX.Element
  secondUser: Pick<Types.User, 'uuid' | 'name' | 'stars'>
  loading: boolean
}
export const CompetingUsersContainer: React.FC<CompetingUsersContainerProps> = ({
  actionButton,
  secondUser,
  loading,
}) => {
  const { currentUser } = useCurrentUserContext()
  const { name: userOneName, uuid: userOneUUID, stars: userOneStars } = currentUser!

  const navigate = useNavigate()

  return (
    <VStack h="100%" w="100%" display-name="competing-users-vstack" spacing={{ base: 5, md: 20 }}>
      <ChooseGameModeButton />
      <Stack
        display-name="user-containers"
        w="100%"
        h={{ base: '80%', md: '70%' }}
        alignItems={{ base: 'center', md: 'center' }}
        justifyContent="center"
        flexDir={{ base: 'column', md: 'row' }}
        gap={{ base: 5, md: '40px' }}
      >
        <Flex
          flexDir="column"
          display-name={`user-${userOneUUID}-container`}
          w={{ base: '150px', md: '200px' }}
          h={{ base: '170px', md: '220px' }}
          borderWidth="1px"
          borderColor="#ECEDEF"
          justifyContent="center"
          alignItems="center"
          gap={6}
        >
          <Avatar
            background={'aliceblue'}
            w={{ base: 12, md: 20 }}
            h={{ base: 12, md: 20 }}
            src={user01}
          />

          <Tooltip label={userOneName} placement="top">
            <Heading fontSize={{ base: 'sm', md: '2xl' }}>
              {truncate(userOneName, { length: 15 })}
            </Heading>
          </Tooltip>

          {userOneStars > 0 && (
            <Flex
              display-name="user-01-star-container"
              w="100%"
              mt="0px !important"
              justifyContent="center"
            >
              <StarIcon />
              <Text fontSize="sm">{userOneStars}</Text>
            </Flex>
          )}
        </Flex>

        <Flex display-name="versus-image-container">
          <Image src={versusImg} maxW="200px" />
        </Flex>

        <Flex
          flexDir="column"
          display-name="user-2-container"
          w={{ base: '150px', md: '200px' }}
          h={{ base: '170px', md: '220px' }}
          borderWidth="1px"
          borderColor="#ECEDEF"
          justifyContent="center"
          alignItems="center"
          gap={6}
          position="relative"
        >
          {loading && (
            <VStack
              display="none"
              display-name="skeletons-div-container"
              spacing={10}
              w="100%"
              h="100%"
              justifyContent="center"
            >
              <SkeletonCircle height="80px" width="80px" isLoaded={!loading} />
              <Skeleton height="30px" w="80%" isLoaded={!loading} />
            </VStack>
          )}
          {!loading && secondUser && (
            <>
              <Avatar
                background={'aliceblue'}
                w={{ base: 12, md: 20 }}
                h={{ base: 12, md: 20 }}
                src={user02}
              />

              <Tooltip label={secondUser.name} placement="top">
                <Heading fontSize={{ base: 'sm', md: '2xl' }}>
                  {truncate(secondUser.name, { length: 15 })}
                </Heading>
              </Tooltip>
              {secondUser.stars > 0 && (
                <Flex
                  display-name="user-02-star-container"
                  w="100%"
                  mt="0px !important"
                  justifyContent="center"
                >
                  <StarIcon />
                  <Text fontSize="sm">{secondUser.stars}</Text>
                </Flex>
              )}
            </>
          )}
          <Flex
            display-name="clear-user-button"
            position="absolute"
            top="-21px"
            right="-17px"
            mt="0px !important"
          >
            {actionButton}
          </Flex>
        </Flex>
      </Stack>
      <StartGameButton
        toUserUuid={secondUser.uuid}
        toUserName={secondUser.name}
        isDisabled={loading}
      />
    </VStack>
  )
}
