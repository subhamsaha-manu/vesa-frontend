import { Box, Flex, Heading, Stack, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { HandleChallenges } from './HandleChallenges'

import { formatProductionURL } from '@/apollo/utils'
import { ContentLayout } from '@/components/Layout'
import { useCurrentUserContext } from '@/features/auth'

type IncomingChallengeInfo = {
  challengeId: string
  senderUserUuid: string
  toUserUuid: string
}

export const ChooseChallengeMode = () => {
  const location = useLocation()

  const incomingPath: string = location.pathname

  const { currentUser } = useCurrentUserContext()
  const { uuid: userUuid, name } = currentUser!
  const navigate = useNavigate()

  const [isInChallenge, setIsInChallenge] = useState<boolean>(false)
  const [incomingChallengeInfo, setIncomingChallengeInfo] = useState<IncomingChallengeInfo>({
    challengeId: '',
    senderUserUuid: '',
    toUserUuid: '',
  })

  const gameModes = [
    {
      id: 1,
      mode: 'one-v-one',
      title: '1 on 1',
      backgroundColor: '#0093E9',
      backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
      url: 'one-v-one',
    },
    {
      id: 2,
      mode: 'with-friend',
      title: 'With Friends',
      backgroundColor: '#85FFBD',
      backgroundImage: 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
      url: 'play-with-friend',
    },
  ]

  const navigateTo = (route: string) => {
    navigate(`/app/${route}`)
  }

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production'
    const url = isProduction
      ? formatProductionURL(process.env.REACT_APP_BACKEND_PRODUCTION_URL!)
      : process.env.REACT_APP_BACKEND_DEVELOPMENT_URL
    const source = new EventSource(`${url}/startOneVOneChallenge`)

    source.onmessage = (e) => {
      const parsedData = JSON.parse(e.data)

      if (parsedData.toUserUuid === userUuid && !isInChallenge) {
        setIsInChallenge(true)
        //setIncomingChallengeInfo(parsedData)
        //onOpen()
      }
    }

    source.onerror = (e) => {
      console.error(e)
    }
    return () => {
      axios.post(`${url}/updateOneVOneChallenge`)
      source.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ContentLayout pageTitle="">
        <VStack
          display-name="game-mode-container"
          h="77vh"
          w="100%"
          alignItems="start"
          spacing={{ base: 5, md: 20 }}
        >
          <Heading fontSize={{ base: 'xl', md: '4xl' }} alignSelf={{ base: 'center', md: 'start' }}>
            Hi welcome back {name}
          </Heading>
          <Stack
            display-name="game-mode-container-stack"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="space-evenly"
            gap={20}
            flexDir={{ base: 'column', md: 'row' }}
          >
            {gameModes.map(({ id, mode, title, backgroundColor, backgroundImage, url }) => {
              return (
                <VStack display-name={`${mode}-game-mode`} key={mode} gap={2} w="352px">
                  <Flex
                    borderWidth="2px"
                    borderRadius="lg"
                    overflow="hidden"
                    w="100%"
                    justifyContent="center"
                    rounded="lg"
                    bg={backgroundColor}
                    backgroundImage={backgroundImage}
                    boxShadow="lg"
                  >
                    <Box
                      m={5}
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      w="80%"
                      p={6}
                      bg={backgroundColor}
                      backgroundImage={backgroundImage}
                      rounded="lg"
                      boxShadow="lg"
                      cursor="pointer"
                      onClick={() => navigateTo(url)}
                    >
                      <VStack w="100%" display-name="heading-vstack" spacing={6}>
                        <Heading size="2xl">Play</Heading>
                        <Heading size="xl">{title}</Heading>
                      </VStack>
                    </Box>
                  </Flex>
                </VStack>
              )
            })}
          </Stack>
        </VStack>
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
