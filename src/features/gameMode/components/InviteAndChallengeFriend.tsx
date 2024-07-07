import { Button, Flex, HStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { InputField } from '@/components/form'
import { useUpdateChallengeMutation } from '@/features/challenge/apis/updateChallenge.generated'
import { useSendChallengeAndInviteMutation } from '@/features/gameMode/apis/sendChallengeAndInvite.generated'
import { ChallengeStatus } from '@/types'
import {
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
  REQUIRED_ERROR_MESSAGE,
} from '@/utils/constants'

const schema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: REQUIRED_ERROR_MESSAGE('Email') })
    .regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
      message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
    }),
})
export const InviteAndChallengeFriend: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const navigate = useNavigate()

  const host = window.location.host

  const [updateChallenge, { loading: updatingChallenge }] = useUpdateChallengeMutation()

  const [sendChallengeAndInvite, { loading: sendingChallenge }] = useSendChallengeAndInviteMutation(
    {
      onCompleted: (data) => {
        const challengeId = data.sendChallengeAndInvite

        updateChallenge({
          variables: {
            challengeId,
            status: ChallengeStatus.Started,
          },
        }).then(() => {
          navigate(`/app/challenge/${challengeId}?mode=invite&profile=sender`)
        })
      },
    }
  )

  const onSubmit = (values?: any) => {
    const { email } = values
    sendChallengeAndInvite({
      variables: { email, host },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="invite-and-challenge-friend-form">
      <HStack display-name="invite-and-challenge-friend-container">
        <Flex display-name="invite-and-challenge-friend-email-input-box-flex" w="300px">
          <InputField
            testid="email"
            fieldName="email"
            label=""
            placeholder="Email"
            register={register}
            type="email"
            error={errors['email'] as FieldError}
            styleProps={{ height: 45 }}
          />
        </Flex>
        <Flex
          display-name="invite-and-challenge-friend-submit-button-flex"
          w={{ base: 'null', md: '150px' }}
        >
          <Button
            variant="outline"
            colorScheme="cyan"
            type="submit"
            isLoading={sendingChallenge || updatingChallenge}
            spinnerPlacement="end"
            mt="7px"
            height="45px"
          >
            Send
          </Button>
        </Flex>
      </HStack>
    </form>
  )
}
