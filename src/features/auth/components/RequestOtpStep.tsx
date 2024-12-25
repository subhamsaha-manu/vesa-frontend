import { Flex, Heading, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { FieldValues } from 'react-hook-form'

import { AuthByEmail } from './AuthByEmail'
import { AuthByPhone } from './AuthByPhone'
import { AuthContainerStepEnum } from './AuthContainer'

import { useRequestOtpMutation } from '../apis/requestOtp.generated'

import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { AuthByType } from '@/types'

type RequestOtpStepProps = {
  onSuccess: (step: AuthContainerStepEnum) => void
  setSentTo: (sentTo: string) => void
  authBy: AuthByType
  setAuthBy: (authBy: AuthByType) => void
}

export const RequestOtpStep: FC<RequestOtpStepProps> = ({
  onSuccess,
  setSentTo,
  authBy,
  setAuthBy,
}) => {
  const [requestOtp, { loading }] = useRequestOtpMutation()

  const onRequestOTP = (values: FieldValues) => {
    const value = authBy === AuthByType.Phone ? values['phoneNumber'] : values['email']

    void requestOtp({
      variables: {
        sendTo: value,
        contactMethod: authBy,
      },
    }).then((response) => {
      if (response.data?.requestOtp) {
        toaster.create({
          title: 'OTP Sent',
          description: 'An OTP has been sent.',
          type: 'success',
          duration: 2000,
        })
        onSuccess(AuthContainerStepEnum.VERIFY_OTP)
        setSentTo(value)
      }
    })
  }

  return (
    <>
      <Flex display-name="heading" justify="center">
        <Heading fontSize="2xl">My Account</Heading>
      </Flex>
      <Flex display-name="auth-modal-description" w="100%" textAlign="center">
        <Text fontSize={{ base: 'sm', xl: 'md' }}>
          Please enter your mobile number or registered email ID to receive a verification code.
        </Text>
      </Flex>
      {authBy === AuthByType.Phone ? (
        <AuthByPhone onSubmit={onRequestOTP} showSpinner={false} />
      ) : (
        <AuthByEmail onSubmit={onRequestOTP} showSpinner={false} />
      )}
      <Flex display-name="request-otp" justify="center" gap="4" flexDir="column" align="center">
        <Button
          variant="solid"
          colorPalette="red"
          size="lg"
          borderRadius="40px"
          color="white"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          onClick={() =>
            document.getElementById('auth-form')?.dispatchEvent(
              new Event('submit', {
                cancelable: true,
                bubbles: true,
              })
            )
          }
          fontSize="25px"
          fontWeight="400"
          disabled={loading}
          loading={loading}
        >
          Request OTP
        </Button>
        <Text fontSize={{ base: 'sm', xl: 'md' }}>Or Login Using</Text>
        <Button
          variant="solid"
          size="md"
          color="black"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          onClick={() =>
            setAuthBy(authBy === AuthByType.Phone ? AuthByType.Email : AuthByType.Phone)
          }
          disabled
        >
          {authBy === AuthByType.Phone ? 'Email' : 'Phone'}
        </Button>
      </Flex>
      <Text fontSize={{ base: 'xs' }} textAlign="center" fontWeight="300">
        Registering for this site allows you to access your order status and history. We will only
        ask you for information necessary to make the purchase process faster and easier.
      </Text>
    </>
  )
}
