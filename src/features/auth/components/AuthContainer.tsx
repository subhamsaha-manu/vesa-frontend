import { Flex } from '@chakra-ui/react'
import { FC, useState } from 'react'

import { RequestOtpStep } from './RequestOtpStep'
import { UserBasicDetails } from './UserBasicDetails'
import { VerifyOtpStep } from './VerifyOtpStep'

import { AuthByType } from '@/types'

export enum AuthContainerStepEnum {
  REQUEST_OTP,
  VERIFY_OTP,
  BASIC_INFO,
}

const AuthContainer: FC = () => {
  const [authContainerStep, setAuthContainerStep] = useState<AuthContainerStepEnum>(
    AuthContainerStepEnum.REQUEST_OTP
  )
  const [sendTo, setSendTo] = useState<string>('')
  const [authBy, setAuthBy] = useState<AuthByType>(AuthByType.Email)

  return (
    <Flex
      display-name="auth-modal-content-flex"
      w="100%"
      flexDir="column"
      gap={6}
      borderRadius="24px"
      maxW="420px"
      p={{ base: '12px' }}
      border="1px solid black"
      m="auto"
    >
      {authContainerStep === AuthContainerStepEnum.REQUEST_OTP && (
        <RequestOtpStep
          onSuccess={setAuthContainerStep}
          setSentTo={setSendTo}
          authBy={authBy}
          setAuthBy={setAuthBy}
        />
      )}
      {authContainerStep === AuthContainerStepEnum.VERIFY_OTP && (
        <VerifyOtpStep sendTo={sendTo} navigateToStep={setAuthContainerStep} authBy={authBy} />
      )}
      {authContainerStep === AuthContainerStepEnum.BASIC_INFO && (
        <UserBasicDetails sendTo={sendTo} authBy={authBy} />
      )}
    </Flex>
  )
}

export default AuthContainer
