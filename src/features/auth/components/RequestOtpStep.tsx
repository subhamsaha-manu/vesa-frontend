import React, { FC } from 'react'
import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { AuthByType } from '@/types'
import { AuthByPhone } from './AuthByPhone'
import { AuthByEmail } from './AuthByEmail'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { useRequestOtpMutation } from '../apis/requestOtp.generated'
import { FieldValues } from 'react-hook-form'
import { AuthContainerStepEnum } from './AuthContainer'

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
  const toast = useToast()

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
        toast({
          title: 'OTP Sent',
          description: 'An OTP has been sent.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        onSuccess(AuthContainerStepEnum.VERIFY_OTP)
        setSentTo(value)
      }
    })
  }

  return (
    <>
      <Flex display-name="heading" justify="center">
        <Heading fontSize={{ base: 'md', xl: '2xl' }}>My Account</Heading>
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
          size="lg"
          color="white"
          background="black"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="40px"
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
          leftIcon={loading ? <SpinnerContainer size="20px" /> : undefined}
        >
          Request OTP
        </Button>
        <Text fontSize={{ base: 'sm', xl: 'md' }}>Or Login Using</Text>
        <Button
          variant="outline"
          size="md"
          color="black"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          onClick={() =>
            setAuthBy(authBy === AuthByType.Phone ? AuthByType.Email : AuthByType.Phone)
          }
        >
          {authBy === AuthByType.Phone ? 'Email' : 'Phone'}
        </Button>
      </Flex>
      <Text fontSize={{ base: 'xs', xl: 'md' }} textAlign="center" fontWeight="500">
        Registering for this site allows you to access your order status and history. We will only
        ask you for information necessary to make the purchase process faster and easier.
      </Text>
    </>
  )
}
