import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { PencilEdit01Icon } from 'hugeicons-react'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContainerStepEnum } from './AuthContainer'
import { OtpInputField } from './OtpInputField'

import { useVerifyOtpMutation } from '../apis/verifyOtp.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { AuthByType } from '@/types'
import { TOKEN, USER_ID } from '@/utils/constants'
import { storage } from '@/utils/storage'

type VerifyOtpStepProps = {
  sendTo: string
  authBy: AuthByType
  navigateToStep: (step: AuthContainerStepEnum) => void
}

export const VerifyOtpStep: FC<VerifyOtpStepProps> = ({ sendTo, authBy, navigateToStep }) => {
  const [otp, setOtp] = useState<string>('')
  const toast = useToast()

  const navigate = useNavigate()

  const [verifyOtp, { loading }] = useVerifyOtpMutation()

  const onVerifyOtp = () => {
    void verifyOtp({
      variables: {
        sendTo,
        contactMethod: authBy,
        otp,
      },
    }).then((response) => {
      const responseData = response.data?.verifyOtp
      if (responseData?.isVerified) {
        toast({
          title: 'OTP Verified',
          description: 'You have successfully verified your OTP.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        storage.setItem(USER_ID, responseData.userId)
        storage.setItem(TOKEN, responseData.token)
        navigate('/')
      } else {
        toast({
          title: 'Invalid OTP',
          description: 'Please try again.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    })
  }

  return (
    <>
      <Flex display-name="verify-otp-step-heading" justify="center">
        <Heading fontSize="2xl">Enter OTP</Heading>
      </Flex>
      <Flex display-name="verify-otp-step-description" w="100%" textAlign="center">
        <Text fontSize={{ base: 'sm', xl: 'md' }}>
          The verification OTP is sent on your {authBy} number.
        </Text>
      </Flex>
      <Flex gap={4} justify="center">
        <Text fontSize={{ base: 'sm', xl: 'md' }} as="b">
          {sendTo}
        </Text>
        <PencilEdit01Icon
          size={18}
          cursor="pointer"
          onClick={() => navigateToStep(AuthContainerStepEnum.REQUEST_OTP)}
        />
      </Flex>
      <OtpInputField otpLength={6} onEntryComplete={setOtp} />
      <Flex display-name="verify-otp" justify="center" gap="4" flexDir="column" align="center">
        <Button
          variant="solid"
          size="lg"
          color="white"
          background="black"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="40px"
          onClick={onVerifyOtp}
          fontSize="25px"
          fontWeight="400"
          isDisabled={loading}
          leftIcon={loading ? <SpinnerContainer size="20px" /> : undefined}
        >
          Verify OTP
        </Button>
      </Flex>
    </>
  )
}
