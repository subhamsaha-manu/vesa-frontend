import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Rules } from './Rules'

import { useIsInviteAcceptedQuery } from '../apis/isInviteAccepted.generated'
import { useQuestionIdsForChallengeLazyQuery } from '../apis/questionIdsForChallenge.generated'
import { useUpdateChallengeMutation } from '../apis/updateChallenge.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ChallengeStatus } from '@/types'

export const HostContainer: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [shouldStartTimer, setShouldStartTimer] = useState<boolean>(false)

  const {
    data,
    loading: isInviteAcceptedLoading,
    startPolling,
    stopPolling,
  } = useIsInviteAcceptedQuery({
    variables: {
      challengeId: id!,
    },
    fetchPolicy: 'network-only',
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

  useEffect(() => {
    startPolling(2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data?.isInviteAccepted) {
      getQuestionIdsForChallenge()
      stopPolling()
    }
  }, [data?.isInviteAccepted, getQuestionIdsForChallenge, stopPolling])

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

  if (isInviteAcceptedLoading || getQuestionIdsForChallengeLoading) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <Rules
      startTimer={shouldStartTimer}
      cancelChallengeAction={cancelChallenge}
      startChallengeAction={startChallenge}
      showSpinner={startChallengeLoading}
      isChallengeActive
      isPrimaryButtonEnabled={data?.isInviteAccepted}
    />
  )
}
