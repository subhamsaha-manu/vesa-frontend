import { ArrowRightIcon, CheckIcon, ViewIcon, WarningTwoIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react'
import { capitalize, isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { NoChallenges } from './NoChallenges'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { useChallengesLazyQuery } from '@/features/dashboard/apis/challenges.generated'
import { ErrorFallback } from '@/providers/app'
import { ChallengeStatus, ChallengeType } from '@/types'

export const ChallengeSection: React.FC = () => {
  const [getChallenges, { loading: challengesLoading, error, data: challenges }] =
    useChallengesLazyQuery({
      fetchPolicy: 'network-only',
    })

  useEffect(() => {
    getChallenges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const source = new EventSource(`http://localhost:9006/challengeUpdate`)

    source.onmessage = (e) => {}

    source.onerror = (e) => {
      console.error(e)
    }
  }, [])

  const navigate = useNavigate()

  if (challengesLoading) {
    return <SpinnerContainer height="50vh" />
  }

  if (error) {
    return <ErrorFallback />
  }

  if (isEmpty(challenges?.challenges) || !challenges?.challenges) {
    return <NoChallenges />
  }

  const receivedChallenges = challenges.challenges.filter(
    (challenge) => challenge.type === ChallengeType.Received
  )
  const sentChallenges = challenges.challenges.filter(
    (challenge) => challenge.type === ChallengeType.Sent
  )

  const getBackgroundColor = (challengeStatus: ChallengeStatus) => {
    switch (challengeStatus) {
      case ChallengeStatus.Completed:
        return '#D3F2F0 !important'
      case ChallengeStatus.Started:
        return '#d1f9e0 !important'
      case ChallengeStatus.Cancelled:
        return '#ffeee5 !important'
      case ChallengeStatus.Pending:
        return '#ffe2b2 !important'
      default:
        return '#f5f5f5 !important'
    }
  }
  return (
    <Flex display-name="questionIdsForChallenge-section-flex" mt={10} flexDirection="column">
      <Heading size="sm">Challenges</Heading>
      <HStack
        display-name="questionIdsForChallenge-section-hstack"
        mt={10}
        justifyContent="space-around"
        alignItems="start"
      >
        <Box display-name="received-questionIdsForChallenge-section">
          <TableContainer>
            <Table variant="striped" size="lg" border="1px solid black">
              <TableCaption>Received Challenges</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {receivedChallenges.map((challenge) => {
                  const { uuid, title, status } = challenge
                  return (
                    <Tr key={uuid}>
                      <Td bg={getBackgroundColor(status)}>{title}</Td>
                      <Td bg={getBackgroundColor(status)}>{capitalize(status)}</Td>
                      {status === ChallengeStatus.Started && (
                        <Td bg={getBackgroundColor(status)}>
                          <Box
                            display="flex"
                            justifyContent="center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/app/questionIdsForChallenge/${uuid}`)}
                          >
                            <Tooltip hasArrow label="Start challenge">
                              <Icon as={ArrowRightIcon} w={5} h={5} />
                            </Tooltip>
                          </Box>
                        </Td>
                      )}
                      {status === ChallengeStatus.Pending && (
                        <Td bg={getBackgroundColor(status)}>
                          <Box
                            display="flex"
                            justifyContent="center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/app/questionIdsForChallenge/${uuid}`)}
                          >
                            <Tooltip hasArrow label="Start challenge">
                              <Icon as={ViewIcon} w={6} h={6} />
                            </Tooltip>
                          </Box>
                        </Td>
                      )}
                      {status === ChallengeStatus.Completed && (
                        <Td bg={getBackgroundColor(status)}>
                          <Box display="flex" justifyContent="center" style={{ cursor: 'pointer' }}>
                            <Tooltip hasArrow label="Challenge completed">
                              <Icon as={CheckIcon} w={6} h={6} />
                            </Tooltip>
                          </Box>
                        </Td>
                      )}
                      {status === ChallengeStatus.Cancelled && (
                        <Td bg={getBackgroundColor(status)}>
                          <Box display="flex" justifyContent="center" style={{ cursor: 'pointer' }}>
                            <Tooltip hasArrow label="Challenge cancelled">
                              <Icon as={WarningTwoIcon} w={6} h={6} />
                            </Tooltip>
                          </Box>
                        </Td>
                      )}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box display-name="sent-questionIdsForChallenge-section">
          <TableContainer>
            <Table variant="striped" colorScheme="facebook" size="lg" border="1px solid black">
              <TableCaption>Sent Challenges</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sentChallenges.map((challenge) => {
                  const { uuid, title, status } = challenge
                  return (
                    <Tr key={uuid}>
                      <Td>{title}</Td>
                      <Td>{capitalize(status)}</Td>
                      {status === ChallengeStatus.Pending && (
                        <Td>
                          <Box display="flex" justifyContent="center" style={{ cursor: 'pointer' }}>
                            <Tooltip hasArrow label="View challenge">
                              <Icon as={ViewIcon} w={6} h={6} />
                            </Tooltip>
                          </Box>
                        </Td>
                      )}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </HStack>
    </Flex>
  )
}
