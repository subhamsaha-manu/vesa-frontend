import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Rules } from './Rules'

import { useIsChallengeActiveQuery } from '../apis/isChallengeActive.generated'
import { useQuestionIdsForChallengeLazyQuery } from '../apis/questionIdsForChallenge.generated'
import { useUpdateChallengeMutation } from '../apis/updateChallenge.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ChallengeStatus } from '@/types'

export const ChallengeRules: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shouldStartTimer, setShouldStartTimer] = useState<boolean>(false)

  const { data: isChallengeActive, loading: isChallengeActiveLoading } = useIsChallengeActiveQuery({
    variables: {
      challengeId: id!,
    },
    onCompleted: (data) => {
      if (data.isChallengeActive) {
        getQuestionIdsForChallenge()
      }
    },
  })

  const [
    getQuestionIdsForChallenge,
    { data: questionIds, loading: getQuestionIdsForChallengeLoading },
  ] = useQuestionIdsForChallengeLazyQuery({
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
