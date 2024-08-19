import React, { FC, useState } from 'react'
import { Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { AuthByPhone } from '@/features/auth/components/AuthByPhone'
import { FieldValues } from 'react-hook-form'
import { AuthByEmail } from '@/features/auth/components/AuthByEmail'

enum AuthByType {
  EMAIL,
  PHONE,
}

const AuthModal: FC = () => {
  const [authBy, setAuthBy] = useState<AuthByType>(AuthByType.PHONE)

  const onRequestOTP = (values: FieldValues) => {
    const value = authBy === AuthByType.PHONE ? values['phoneNumber'] : values['email']
    console.log('Requesting OTP for:', value)
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
        {authBy === AuthByType.PHONE ? (
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
              setAuthBy(authBy === AuthByType.PHONE ? AuthByType.EMAIL : AuthByType.PHONE)
            }
          >
            {authBy === AuthByType.PHONE ? 'Email' : 'Phone'}
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

export default AuthModal
