import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

import { formatProductionURL } from '@/apollo/utils'
import { useUpdateChallengeMutation } from '@/features/challenge/apis/updateChallenge.generated'
import { useIsChallengeAcceptedQuery } from '@/features/sending-challenge/apis/isChallengeAccepted.generated'
import { ChallengeStatus } from '@/types'

type SendingChallengeModalProps = {
  challengeId: string
  challengedUserUuid: string
  challengedUserName: string
  isOpen: boolean
  onClose: () => void
}

export const SendingChallengeModal: React.FC<SendingChallengeModalProps> = ({
  challengeId,
  challengedUserUuid,
  challengedUserName,
  isOpen,
  onClose,
}) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const url = isProduction
    ? formatProductionURL(process.env.REACT_APP_BACKEND_PRODUCTION_URL!)
    : process.env.REACT_APP_BACKEND_DEVELOPMENT_URL

  const navigate = useNavigate()

  const { data, loading, startPolling, stopPolling } = useIsChallengeAcceptedQuery({
    variables: {
      challengeId,
      challengedUserUuid,
    },
  })

  const [updateChallenge, { loading: updateChallengeLoading }] = useUpdateChallengeMutation()
  useEffect(() => {
    startPolling(2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data?.isChallengeAccepted) {
      if (
        [ChallengeStatus.Started, ChallengeStatus.Cancelled].includes(data?.isChallengeAccepted)
      ) {
        stopPolling()
        if (data?.isChallengeAccepted === ChallengeStatus.Started) {
          navigate(`/app/challenge/${challengeId}?mode=one-v-one`)
        }
      }
    }
  }, [challengeId, data?.isChallengeAccepted, navigate, stopPolling])

  const size = useBreakpointValue({ base: 'sm', md: 'lg' })

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        {(loading || data?.isChallengeAccepted === ChallengeStatus.Pending) && (
          <>
            <ModalHeader alignSelf="center">
              <Heading fontSize={{ base: 'md', md: '2xl' }}>
                Waiting for {challengedUserName} to accept challenge
              </Heading>
            </ModalHeader>
            <ModalBody p={8}>
              <VStack
                display-name="sending-challenge-body-modal-vstack"
                w="100%"
                h="100%"
                justifyContent="center"
              >
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              </VStack>
            </ModalBody>
          </>
        )}
        {!loading && data?.isChallengeAccepted === ChallengeStatus.Started && (
          <>
            <ModalHeader alignSelf="center">
              <Heading fontSize={{ base: 'md', md: 'xl' }}>
                {challengedUserName} has accepted challenge
              </Heading>
            </ModalHeader>

            <ModalBody p={8}>
              <Heading fontSize={{ base: 'sm', md: 'md' }} color="#1E355B">
                Starting your game
              </Heading>
            </ModalBody>
          </>
        )}
        {!loading && data?.isChallengeAccepted === ChallengeStatus.Cancelled && (
          <>
            <ModalHeader alignSelf="center">
              <Heading fontSize={{ base: 'md', md: '2xl' }}>
                {challengedUserName} has declined challenge
              </Heading>
            </ModalHeader>

            <ModalBody p={8}>
              <Heading fontSize={{ base: 'sm', md: 'lg' }} color="#1E355B">
                Go back and challenge some one else
              </Heading>
            </ModalBody>
            <ModalFooter>
              <Button
                h="40px"
                w="60px"
                colorScheme="blue"
                mr={3}
                isLoading={updateChallengeLoading}
                onClick={() => {
                  updateChallenge({
                    variables: {
                      challengeId,
                      status: ChallengeStatus.Cancelled,
                    },
                  }).then((data) => {
                    if (data.data?.updateChallenge) {
                      axios.post(`${url}/updateOneVOneChallenge`)
                      onClose()
                    }
                  })
                }}
              >
                Back
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
