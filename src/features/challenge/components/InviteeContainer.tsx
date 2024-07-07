import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useCreateChallengeEntryMutation } from '../apis/createChallengeEntry.generated'
import { useIsChallengeActiveQuery } from '../apis/isChallengeActive.generated'
import { useQuestionIdsForChallengeLazyQuery } from '../apis/questionIdsForChallenge.generated'
import { useUpdateChallengeMutation } from '../apis/updateChallenge.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { Rules } from '@/features/challenge/components/Rules'
import { ChallengeStatus } from '@/types'

export const InviteeContainer: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [shouldStartTimer, setShouldStartTimer] = useState<boolean>(false)

  const { data: isChallengeActive, loading: isChallengeActiveLoading } = useIsChallengeActiveQuery({
    variables: {
      challengeId: id!,
    },
    onCompleted: (data) => {
      if (data.isChallengeActive) {
        createChallengeEntry({
          variables: {
            challengeId: id!,
          },
        })
      }
    },
    fetchPolicy: 'network-only',
  })

  const [createChallengeEntry] = useCreateChallengeEntryMutation({
    onCompleted: (data) => {
      if (data.createChallengeEntry) {
        getQuestionIdsForChallenge()
      }
    },
  })

  const [getQuestionIdsForChallenge, { data: questionIds }] = useQuestionIdsForChallengeLazyQuery({
    variables: {
      challengeId: id!,
    },
    onCompleted: (data) => {
      if (!isEmpty(data.questionIdsForChallenge)) {
        setShouldStartTimer(true)
      }
    },
  })

  const [startChallenge, { loading: startChallengeLoading }] = useUpdateChallengeMutation({
    variables: {
      challengeId: id!,
      status: ChallengeStatus.Started,
    },
    onCompleted: (data) => {
      if (data.updateChallenge) {
        navigate(`/app/challenge/start/${id}`, {
          state: {
            questionIds: questionIds?.questionIdsForChallenge,
          },
        })
      }
    },
  })

  const [cancelChallenge] = useUpdateChallengeMutation({
    variables: {
      challengeId: id!,
      status: ChallengeStatus.Cancelled,
    },
    onCompleted: (data) => {
      if (data.updateChallenge) {
        navigate('/app')
      }
    },
  })

  if (isChallengeActiveLoading) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <Rules
      startTimer={shouldStartTimer}
      cancelChallengeAction={cancelChallenge}
      startChallengeAction={startChallenge}
      showSpinner={startChallengeLoading}
      isChallengeActive={isChallengeActive?.isChallengeActive}
      isPrimaryButtonEnabled={shouldStartTimer}
    />
  )
}
