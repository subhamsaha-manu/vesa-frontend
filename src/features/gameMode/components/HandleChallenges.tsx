import { useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { formatProductionURL } from '@/apollo/utils'
import { useCurrentUserContext } from '@/features/auth'
import { IncomingChallengeModal } from '@/features/incoming-challenge'
import { SendingChallengeModal } from '@/features/sending-challenge'

type IncomingChallengeInfo = {
  challengeId: string
  senderUserUuid: string
  toUserUuid: string
}

type HandleChallengesProps = {
  sendingChallengeModalIsOpen: boolean
  sentChallengeId: string
  toUserUuid: string
  toUserName: string
}
export const HandleChallenges: React.FC<HandleChallengesProps> = ({
  sendingChallengeModalIsOpen,
  sentChallengeId,
  toUserUuid,
  toUserName,
}) => {
  const navigate = useNavigate()
  const { currentUser } = useCurrentUserContext()
  const { uuid: userOneUUID } = currentUser!

  const [isInChallenge, setIsInChallenge] = useState<boolean>(false)
  const [incomingChallengeInfo, setIncomingChallengeInfo] = useState<IncomingChallengeInfo>({
    challengeId: '',
    senderUserUuid: '',
    toUserUuid: '',
  })
  const {
    isOpen: incomingChallengeModalIsOpen,
    onOpen: incomingChallengeModalOnOpen,
    onClose: incomingChallengeModalOnClose,
  } = useDisclosure()
  const { onClose: sendingChallengeModalOnClose } = useDisclosure()

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production'
    const url = isProduction
      ? formatProductionURL(process.env.REACT_APP_BACKEND_PRODUCTION_URL!)
      : process.env.REACT_APP_BACKEND_DEVELOPMENT_URL
    const source = new EventSource(`${url}/startOneVOneChallenge`)

    source.onmessage = (e) => {
      const parsedData = JSON.parse(e.data)

      if (parsedData.toUserUuid === userOneUUID && !isInChallenge) {
        setIsInChallenge(true)
        setIncomingChallengeInfo(parsedData)
        incomingChallengeModalOnOpen()
      }
    }

    source.onerror = (e) => {
      console.error(e)
    }
    return () => {
      //axios.post(`${url}/updateOneVOneChallenge`)
      source.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {incomingChallengeModalIsOpen && (
        <IncomingChallengeModal
          isOpen={incomingChallengeModalIsOpen}
          onClose={incomingChallengeModalOnClose}
          challengeId={incomingChallengeInfo.challengeId}
          challengingUserUuid={incomingChallengeInfo.senderUserUuid}
        />
      )}
      {sendingChallengeModalIsOpen && (
        <SendingChallengeModal
          isOpen={sendingChallengeModalIsOpen}
          onClose={() => {
            sendingChallengeModalOnClose()
            navigate('/app')
          }}
          challengeId={sentChallengeId}
          challengedUserUuid={toUserUuid}
          challengedUserName={toUserName}
        />
      )}
    </>
  )
}
