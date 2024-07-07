import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import React, { useRef, useState } from 'react'
import { ColorFormat, CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer'
import { GiTireIronCross } from 'react-icons/gi'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useGetQuestionQuery } from '../apis/getQuestion.generated'
import { useSaveResultMutation } from '../apis/saveResult.generated'
import { useUpdateChallengeMutation } from '../apis/updateChallenge.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout'
import { ErrorFallback } from '@/providers/app'
import { ChallengeStatus } from '@/types'

type useLocationType = {
  state: {
    questionIds: Array<string>
  }
}

export const ChallengeQuestion: React.FC = () => {
  const { state } = useLocation() as useLocationType
  const { id } = useParams()
  const navigate = useNavigate()
  const [questionCounter, updateQuestionCounter] = useState<number>(0)
  const [optionSelectedId, setOptionSelectedId] = useState<string>('')
  const [score, updateScore] = useState<number>(0)
  const [totalRemainingTime, setTotalRemainingTime] = useState<number>(0)

  const { questionIds } = state

  const windowSize = useRef([window.innerWidth, window.innerHeight])
  const getTimerSize = () => {
    return windowSize.current[0] > 1200 ? 200 : 130
  }

  const { remainingTime } = useCountdown({
    colors: {} as ColorFormat,
    colorsTime: undefined,
    isPlaying: true,
    duration: 20,
    onComplete: () => {
      return {
        shouldRepeat: true,
      }
    },
  })

  const {
    data: question,
    loading,
    error,
  } = useGetQuestionQuery({
    variables: {
      questionId: questionIds[questionCounter],
    },
    fetchPolicy: 'network-only',
  })

  const [saveResult, { loading: savingResult }] = useSaveResultMutation({
    variables: {
      saveResultInput: {
        challengeId: id!,
        totalRemainingTime,
        totalScore: score,
      },
    },
    onCompleted: (data) => {
      if (data.saveResult) {
        navigate(`/app/challenge/result/${id}`)
      }
    },
  })

  const [updateChallenge, { loading: updateChallengeLoading }] = useUpdateChallengeMutation()

  const size = useBreakpointValue({ base: 'md', md: 'lg' })

  if (loading) {
    return <SpinnerContainer height="40vh" />
  }

  if (error || !question?.getQuestion) {
    return <ErrorFallback />
  }

  const TimerComponent = () => (
    <CountdownCircleTimer
      isPlaying
      duration={20}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[20, 10, 5, 0]}
      onComplete={() => {
        if (questionCounter + 1 < questionIds.length) {
          updateQuestionCounter(questionCounter + 1)
          setOptionSelectedId('')
        } else {
          updateChallenge({
            variables: {
              challengeId: id!,
              status: ChallengeStatus.Completed,
            },
          }).then((data) => {
            if (data.data?.updateChallenge) {
              saveResult()
            }
          })
        }
        return {
          shouldRepeat: true,
        }
      }}
      size={getTimerSize()}
      strokeWidth={5}
      trailColor="#d9d9d9"
    >
      {({ remainingTime, color }) => {
        //setTotalRemainingTime(totalRemainingTime + remainingTime)
        if (remainingTime > 7) {
          return (
            <VStack spacing={0}>
              <Text fontSize="xs">Remaining</Text>
              <Text style={{ color, fontSize: 40 }}>{remainingTime}</Text>
              <Text fontSize="xs">seconds</Text>
            </VStack>
          )
        }
        if (remainingTime <= 7) {
          return (
            <VStack spacing={0}>
              <Text fontSize="xs">Hurry up</Text>
              <Text style={{ color, fontSize: 40 }}>{remainingTime}</Text>
              <Text fontSize="xs">seconds</Text>
            </VStack>
          )
        }
      }}
    </CountdownCircleTimer>
  )

  return (
    <ContentLayout pageTitle="">
      <Flex
        display-name="individual-questionIdsForChallenge-question-container"
        flexDirection="column"
        h={{ base: 'null', md: '100%' }}
      >
        <HStack
          display-name="quit-challenge-and-timer-container"
          justifyContent="space-between"
          alignItems="start"
          mr="40px"
          width="90%"
          zIndex="5"
        >
          <Flex display-name="quit-challenge">
            <Button
              leftIcon={<GiTireIronCross />}
              colorScheme="red"
              variant="outline"
              onClick={() =>
                updateChallenge({
                  variables: {
                    challengeId: id!,
                    status: ChallengeStatus.Cancelled,
                  },
                }).then((data) => {
                  if (data.data?.updateChallenge) {
                    navigate('/app')
                  }
                })
              }
            >
              Quit Challenge
            </Button>
          </Flex>
          <Flex display-name="timer-flex" display={{ base: 'flex', md: 'flex' }}>
            {TimerComponent()}
          </Flex>
        </HStack>
        <VStack
          display-name="individual-questionIdsForChallenge-question-VStack"
          gap="15px"
          h="90%"
          alignItems="start"
          justifyContent="center"
          p={0}
        >
          <Box>
            <Heading size="md" color="#1774aa" fontStyle="italic">
              Select the correct answer
            </Heading>
          </Box>
          <HStack
            display-name="question-number-title-section"
            spacing={4}
            mt={{ base: 'null', md: '30px !important' }}
            alignItems={{ base: 'start', md: 'center' }}
          >
            <Box display-name="question-number">
              <Heading fontSize={{ base: 'lg', md: 'xl' }}>{questionCounter + 1}.</Heading>
            </Box>
            <Box display-name="question-title">
              <Heading fontSize={{ base: 'lg', md: 'xl' }}>{question.getQuestion.title}</Heading>
            </Box>
          </HStack>
          <Flex
            display-name="options-section"
            w="100%"
            justifyContent="center"
            mt={{ base: 'null', md: '20px !important' }}
          >
            <RadioGroup w="100%">
              <SimpleGrid columns={1} spacing={2} w="100%">
                {question.getQuestion.choices.map((choice) => {
                  const { uuid, title, isCorrect } = choice
                  return (
                    <Box
                      display-name="individual-choice-section"
                      display="flex"
                      flexDirection="row"
                      height={{ base: '50px', md: '80px' }}
                      key={uuid}
                      border={
                        optionSelectedId === uuid ? '2px solid #00aadc' : '2px solid #8EE4FF96'
                      }
                      borderRadius="6px"
                      cursor="pointer"
                      bg={optionSelectedId === uuid ? '#00aadc96' : 'inherit'}
                    >
                      <Box
                        w="40px"
                        display-name="radio-button-section"
                        bg={optionSelectedId === uuid ? '#00aadc96' : '#8EE4FF96'}
                        display="flex"
                        borderRight="2px solid #ededed"
                        justifyContent="center"
                        p="0px 5px 0px 5px"
                      >
                        <Radio
                          id={uuid}
                          size={size}
                          value={uuid}
                          borderColor="black"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setOptionSelectedId(uuid)
                              if (isCorrect) {
                                updateScore(score + 1)
                              }
                            } else {
                              setOptionSelectedId('')
                            }
                          }}
                        />
                      </Box>
                      <Box
                        display="flex"
                        w="100%"
                        display-name="choice-title-section"
                        justifyContent="start"
                        alignItems="center"
                        pl="20px"
                        fontSize={{ base: '20px', md: '30px' }}
                      >
                        {title}
                      </Box>
                    </Box>
                  )
                })}
              </SimpleGrid>
            </RadioGroup>
          </Flex>
        </VStack>
        <HStack
          display-name="question-navigation-button-section"
          justifyContent="start"
          mr="40px"
          mt="15px"
        >
          <Box display-name="next-button-container">
            {questionCounter + 1 < questionIds.length && (
              <Button
                rightIcon={<ArrowForwardIcon />}
                size="lg"
                colorScheme="primary"
                borderRadius="40px"
                variant="solid"
                disabled={isEmpty(optionSelectedId)}
                onClick={() => {
                  setTotalRemainingTime(totalRemainingTime + remainingTime)
                  updateQuestionCounter(questionCounter + 1)
                  setOptionSelectedId('')
                }}
                fontSize="20px"
              >
                Next
              </Button>
            )}
            {questionCounter + 1 === questionIds.length && (
              <Button
                rightIcon={<ArrowForwardIcon />}
                size="lg"
                colorScheme="linkedin"
                variant="solid"
                disabled={isEmpty(optionSelectedId)}
                borderRadius="40px"
                onClick={() => {
                  setTotalRemainingTime(totalRemainingTime + remainingTime)
                  updateChallenge({
                    variables: {
                      challengeId: id!,
                      status: ChallengeStatus.Completed,
                    },
                  }).then((data) => {
                    if (data.data?.updateChallenge) {
                      saveResult()
                    }
                  })
                }}
              >
                {savingResult || updateChallengeLoading ? (
                  <SpinnerContainer size="20px" overflow="unset" />
                ) : (
                  'Submit'
                )}
              </Button>
            )}
          </Box>
        </HStack>
      </Flex>
    </ContentLayout>
  )
}
