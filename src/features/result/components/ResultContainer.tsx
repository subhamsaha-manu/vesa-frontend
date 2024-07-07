import { Box, Button, Circle, Flex, Heading, HStack, VStack } from '@chakra-ui/react'
import { isNil } from 'lodash'
import React, { useEffect } from 'react'
import Confetti from 'react-confetti'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import useWindowSize from 'react-use/lib/useWindowSize'

import { ContentLayout } from '@/components/Layout'
import { useGetChallengeResultQuery } from '@/features/result/apis/getChallengeResult.generated'
import { OutcomeType } from '@/types'

export const ResultContainer: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, loading, startPolling, stopPolling } = useGetChallengeResultQuery({
    variables: {
      challengeId: id!,
    },
  })

  useEffect(() => {
    startPolling(2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data?.getChallengeResult) {
      stopPolling()
    }
  }, [data?.getChallengeResult, stopPolling])

  const { width, height } = useWindowSize()

  const onClose = () => {
    navigate('/app')
  }

  const ResultBody: React.FC<{ text: string; score: number; scoreColour: string }> = ({
    text,
    score,
    scoreColour,
  }) => {
    return (
      <VStack
        display-name="result-body-vstack-container"
        w="100%"
        h="100%"
        justifyContent="center"
        p={6}
        spacing={10}
        mt="40px !important"
      >
        <VStack
          display-name="result-body-vstack"
          w="100%"
          h="100%"
          justifyContent="center"
          spacing={4}
        >
          <Box display-name="result-you-scored-text">
            <Heading size="md" color="#1E355B">
              You scored
            </Heading>
          </Box>
          <Circle size="200px" bg={scoreColour} color="white">
            <Heading size="4xl" color="white">
              {score}
            </Heading>
          </Circle>
        </VStack>
        <VStack display-name="result-text-vstack" w="100%" h="100%" justifyContent="center">
          <Box display-name="result-text">
            <Heading size="xl" color="#1E355B">
              {text}
            </Heading>
          </Box>
        </VStack>
      </VStack>
    )
  }

  return (
    <ContentLayout pageTitle="">
      <Flex display-name="result-container" flexDirection="column" h="76vh">
        <VStack display-name="result-body-vstack" w="100%" height="90%" justifyContent="center">
          <Flex display-name="result-header" justifyContent="center">
            <Heading size="4xl" color="#1E355B">
              Here you go!
            </Heading>
          </Flex>
          {loading ||
            (isNil(data?.getChallengeResult) && (
              <>
                <VStack
                  display-name="result-body-vstack-container"
                  w="100%"
                  h="100%"
                  justifyContent="center"
                  p={6}
                  spacing={10}
                  mt="40px !important"
                >
                  <VStack
                    display-name="result-body-vstack"
                    w="100%"
                    h="100%"
                    justifyContent="center"
                    spacing={4}
                  >
                    <Box display-name="result-you-scored-text">
                      <Heading size="md" color="#1E355B">
                        Fetching your results
                      </Heading>
                    </Box>
                    <ThreeDots
                      height="80"
                      width="80"
                      radius="9"
                      color="#4fa94d"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  </VStack>
                </VStack>
              </>
            ))}
          {!(loading || isNil(data?.getChallengeResult)) &&
            data?.getChallengeResult.outcome === OutcomeType.Win && (
              <VStack
                display-name="result-body-congratulations-vstack"
                w="100%"
                h="100%"
                justifyContent="center"
                p={6}
                spacing={4}
              >
                <Confetti width={width} height={height} />
                <ResultBody
                  text="Congratulations you won!!!"
                  score={data?.getChallengeResult.score}
                  scoreColour="#1DA1F2"
                />
              </VStack>
            )}
          {!(loading || isNil(data?.getChallengeResult)) &&
            data?.getChallengeResult.outcome === OutcomeType.Lost && (
              <ResultBody
                text="Better Luck next time"
                score={data?.getChallengeResult.score}
                scoreColour="tomato"
              />
            )}
          {!(loading || isNil(data?.getChallengeResult)) &&
            data?.getChallengeResult.outcome === OutcomeType.Draw && (
              <VStack
                display-name="modal-body-draw-vstack"
                w="100%"
                h="100%"
                justifyContent="center"
                p={6}
              >
                <ResultBody
                  text="Woah, that was a Draw"
                  score={data?.getChallengeResult.score}
                  scoreColour="#FFD229"
                />
              </VStack>
            )}
        </VStack>
        <HStack display-name="result-footer-container" justifyContent="end">
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Play Again
          </Button>
        </HStack>
      </Flex>
    </ContentLayout>
  )
}
