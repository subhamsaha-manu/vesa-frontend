import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'

import { HandleChallenges } from './HandleChallenges'

import { useStartOneVOneChallengeMutation } from '../apis/startOneVOneChallenge.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'

type StartGameButtonProps = {
  toUserUuid: string
  toUserName: string
  isDisabled: boolean
}
export const StartGameButton: React.FC<StartGameButtonProps> = ({
  toUserUuid,
  toUserName,
  isDisabled,
}) => {
  const [sentChallengeId, setSentChallengeId] = useState<string>('')
  const [sendingChallengeModalIsOpen, setSendingChallengeModalIsOpen] = useState<boolean>(false)

  const [startOneVOneChallenge, { loading: startOneVOneChallengeLoading }] =
    useStartOneVOneChallengeMutation({
      onCompleted: (data) => {
        setSentChallengeId(data.startOneVOneChallenge)
        setSendingChallengeModalIsOpen(true)
      },
    })

  return (
    <>
      <HStack display-name="start-challenge-button-hstack-container">
        <Box display-name="start-challenge-button-container">
          <Button
            rightIcon={<ArrowForwardIcon />}
            size="lg"
            colorScheme="primary"
            borderRadius="40px"
            variant="solid"
            disabled={isDisabled}
            onClick={() => {
              startOneVOneChallenge({
                variables: {
                  input: {
                    toUserUuid,
                  },
                },
              })
            }}
          >
            {startOneVOneChallengeLoading ? (
              <SpinnerContainer size="20px" overflow="unset" />
            ) : (
              'Start Challenge'
            )}
          </Button>
        </Box>
      </HStack>
      <HandleChallenges
        sendingChallengeModalIsOpen={sendingChallengeModalIsOpen}
        sentChallengeId={sentChallengeId}
        toUserUuid={toUserUuid}
        toUserName={toUserName}
      />
    </>
  )
}
