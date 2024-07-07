import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import { SpinnerContainer } from '@/components/elements/Spinner'

type RulesProps = {
  startTimer: boolean
  cancelChallengeAction: () => void
  startChallengeAction: () => void
  showSpinner: boolean
  isChallengeActive?: boolean
  isPrimaryButtonEnabled?: boolean
}
export const Rules: React.FC<RulesProps> = ({
  startTimer,
  cancelChallengeAction,
  startChallengeAction,
  showSpinner,
  isChallengeActive,
  isPrimaryButtonEnabled,
}) => {
  const windowSize = useRef([window.innerWidth, window.innerHeight])

  const getTimerSize = () => {
    return windowSize.current[0] > 1200 ? 200 : 130
  }

  const TimerComponent = () => (
    <CountdownCircleTimer
      isPlaying={startTimer}
      duration={10}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[20, 10, 5, 0]}
      onComplete={() => {
        startChallengeAction()
        return {
          shouldRepeat: false,
        }
      }}
      size={getTimerSize()}
      strokeWidth={5}
      trailColor="#d9d9d9"
    >
      {({ remainingTime, color }) => {
        if (remainingTime <= 10) {
          return (
            <VStack spacing={0}>
              <Text fontSize="xs">Game Starts In</Text>
              <Text style={{ color, fontSize: 40 }}>{remainingTime}</Text>
              <Text fontSize="xs">seconds</Text>
            </VStack>
          )
        }
      }}
    </CountdownCircleTimer>
  )
  return (
    <Flex
      display-name="questionIdsForChallenge-container-flex"
      flexDirection="column"
      h={{ base: 'null', md: '78vh' }}
    >
      <Box
        display-name="rules-container-box"
        background="white"
        w="100%"
        h="100%"
        justifyContent="start"
      >
        <VStack
          display-name="rules-container"
          width="100%"
          justifyContent="start"
          h="100%"
          gap="20px"
        >
          <Flex w="100%" display-name="rules-container-heading-flex" justify="center">
            <Heading fontSize={{ base: 'xl', md: '5xl' }}>Rules</Heading>
          </Flex>
          <Stack
            direction={{ base: 'column', md: 'row-reverse' }}
            w="100%"
            display-name="rules-hstack-list-and-timer-container"
            zIndex="4"
            boxShadow="0 22px 20px -18px rgba(6, 0, 0, 0.4)"
            height="80%"
          >
            <Flex
              display-name="timer-container"
              display={isChallengeActive ? 'flex' : 'none'}
              height={{ base: 'null', md: '100%' }}
              justify={{ base: 'center', md: 'end' }}
              flexGrow={1}
            >
              {TimerComponent()}
            </Flex>
            <VStack
              display-name="rules-list"
              h={{ base: '500px', md: '100%' }}
              w={{ base: '100%', md: '60%' }}
              alignItems="start"
              gap={5}
              p="10px"
              justifyContent="space-evenly"
              overflow="auto"
            >
              <Text fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                1. Each question is for 20 seconds.
              </Text>
              <Text fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                2. Each question has four options.
              </Text>
              <Text fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                3. Each question has one correct option.
              </Text>
              <Text fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                4. You will earn 10 points for winning the game.
              </Text>
              <Text fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                5. You will earn 1 star for winning the game.
              </Text>
              <Text fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                5. You will loose 10 points for losing the game.
              </Text>
              <Text fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}>
                6. You will loose 1 star for losing the game.
              </Text>
            </VStack>
          </Stack>
          {!isChallengeActive && (
            <Flex display-name="challenge-expired-container">
              <Heading size="xl" color="red">
                ** Sorry the challenge is no more active, kindly start a new one **
              </Heading>
            </Flex>
          )}
          <HStack
            display-name="button-container"
            justifyContent="center"
            alignItems="center"
            w="100%"
            mt={10}
          >
            <ButtonGroup gap="4">
              <Button
                size="lg"
                colorScheme="cyan"
                variant="outline"
                onClick={cancelChallengeAction}
              >
                Back
              </Button>
              <Button
                rightIcon={<ArrowForwardIcon />}
                size="lg"
                colorScheme="cyan"
                variant="solid"
                onClick={startChallengeAction}
                disabled={!isPrimaryButtonEnabled}
              >
                {showSpinner ? <SpinnerContainer size="20px" overflow="unset" /> : 'Start Game'}
              </Button>
            </ButtonGroup>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  )
}
