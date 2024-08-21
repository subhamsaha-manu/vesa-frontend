import React, { FC, useState } from 'react'
import { Center, Flex } from '@chakra-ui/react'
import { RequestOtpStep } from './RequestOtpStep'
import { VerifyOtpStep } from './VerifyOtpStep'
import { AuthByType } from '@/types'
import { UserBasicDetails } from './UserBasicDetails'

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
  const [authBy, setAuthBy] = useState<AuthByType>(AuthByType.Phone)

  return (
    <Center>
      <Flex
        display-name="auth-modal-content-flex"
        w="100%"
        flexDir="column"
        gap={6}
        borderRadius="15px"
        maxW="460px"
        p="10px 30px"
        border="1px solid black"
        m="120px auto 60px"
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
    </Center>
  )
}

export default AuthContainer
