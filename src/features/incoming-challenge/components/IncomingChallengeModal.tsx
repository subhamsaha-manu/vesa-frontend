import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetUserInfoQuery } from '../apis/getUserInfo.generated'

import { formatProductionURL } from '@/apollo/utils'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { useUpdateChallengeMutation } from '@/features/challenge/apis/updateChallenge.generated'
import { ChallengeStatus } from '@/types'

type IncomingChallengeModalProps = {
  challengeId: string
  challengingUserUuid: string
  isOpen: boolean
  onClose: () => void
}
export const IncomingChallengeModal: React.FC<IncomingChallengeModalProps> = ({
  challengeId,
  challengingUserUuid,
  isOpen,
  onClose,
}) => {
  const toast = useToast()
  const navigate = useNavigate()

  const isProduction = process.env.NODE_ENV === 'production'
  const url = isProduction
    ? formatProductionURL(process.env.REACT_APP_BACKEND_PRODUCTION_URL!)
    : process.env.REACT_APP_BACKEND_DEVELOPMENT_URL

  const { data: challengingUserInfo, loading } = useGetUserInfoQuery({
    variables: { userId: challengingUserUuid },
    onError: () => {
      toast({
        title: 'Failed to get challenging user information.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })

  const [updateChallenge, { loading: updateChallengeLoading }] = useUpdateChallengeMutation()

  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  const size = useBreakpointValue({ base: 'sm', md: 'lg' })

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf="center">
          <Heading fontSize={{ base: 'md', md: 'xl' }}>Incoming Challenge</Heading>
        </ModalHeader>
        <ModalBody p={8}>
          {(loading || isEmpty(challengingUserInfo?.getUserInfo)) && <SpinnerContainer />}
          {!(loading && isEmpty(challengingUserInfo?.getUserInfo)) && (
            <VStack display-name="incoming-challenge-modal-vstack" spacing={6}>
              <Flex display-name="challenging-user-info-flex">
                <Heading fontSize={{ base: 'sm', md: 'lg' }} color="#1774aa" fontStyle="italic">
                  {challengingUserInfo?.getUserInfo?.name} is inviting you for a challenge
                </Heading>
              </Flex>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            h="40px"
            w="60px"
            colorScheme="blue"
            mr={3}
            disabled={showSpinner}
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
            Reject
          </Button>
          <Button
            h="40px"
            w="60px"
            variant="outline"
            colorScheme="cyan"
            type="submit"
            isLoading={updateChallengeLoading || showSpinner}
            spinnerPlacement="end"
            onClick={() => {
              updateChallenge({
                variables: {
                  challengeId,
                  status: ChallengeStatus.Started,
                },
              }).then((data) => {
                if (data.data?.updateChallenge) {
                  setShowSpinner(true)
                  axios.post(`${url}/updateOneVOneChallenge`)
                  setTimeout(() => {
                    navigate(`/app/challenge/${challengeId}?mode=one-v-one`)
                  }, 2000)
                }
              })
            }}
          >
            Accept
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
