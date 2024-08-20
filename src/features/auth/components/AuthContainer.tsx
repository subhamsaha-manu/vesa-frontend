import React, { FC, useState } from 'react'
import { Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { AuthByPhone } from './AuthByPhone'
import { FieldValues } from 'react-hook-form'
import { AuthByEmail } from './AuthByEmail'
import { useRequestOtpMutation } from '../apis/requestOtp.generated'
import { AuthByType } from '@/types'
import { SpinnerContainer } from '@/components/elements/Spinner'

const AuthContainer: FC = () => {
  const [authBy, setAuthBy] = useState<AuthByType>(AuthByType.Phone)
  const [requestOtp, { loading }] = useRequestOtpMutation()

  const onRequestOTP = (values: FieldValues) => {
    const value = authBy === AuthByType.Phone ? values['phoneNumber'] : values['email']

    void requestOtp({
      variables: {
        sendTo: value,
        contactMethod: authBy,
      },
    })
  }

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
      </Flex>
    </Center>
  )
}

export default AuthContainer
