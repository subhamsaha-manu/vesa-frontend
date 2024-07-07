import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import isNil from 'lodash/isNil'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as z from 'zod'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { Layout } from '@/components/Layout'
import { useUpdatePasswordMutation } from '@/features/change-password/apis/updatePassword.generated'
import { useIsOtpValidLazyQuery } from '@/features/reset-password/apis/isOTPValid.generated'

const schema = z.object({
  newPassword: z.string().min(1, 'Required'),
})

const otpSchema = z.object({
  otp: z.string().min(1, 'Required'),
})
export const ResetPassword: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit: otpValidationHandleSubmit,
    register: otpValidationRegister,
    formState: { errors: otpValidationErrors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  })

  const [isOTPValid, setIsOTPValid] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const toast = useToast()
  const navigate = useNavigate()
  const { userEmail } = useParams()

  const [updatePassword, { loading: updatePasswordInProgress }] = useUpdatePasswordMutation({
    onCompleted: (data) => {
      if (data.updatePassword) {
        toast({
          title: 'Password updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate('/app')
      }
    },
  })

  const [validateOTP, { loading: validatingOTP }] = useIsOtpValidLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data.isOTPValid) {
        setIsOTPValid(true)
      } else {
        toast({
          title: 'OTP Invalid',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    },
  })

  const otpValidationSubmit = (values: any) => {
    const { otp } = values

    validateOTP({
      variables: {
        email: userEmail!,
        otp,
      },
    })
  }

  const onSubmit = (values: any) => {
    const { newPassword } = values

    updatePassword({
      variables: {
        newPassword,
        userEmail,
      },
    })
  }

  return (
    <Layout headerText="Reset Password">
      <Box
        rounded="lg"
        bg="white"
        boxShadow="lg"
        p={8}
        display-name="change-password-box-container"
      >
        <Stack spacing={4} display-name="change-password-stack-container">
          {!isOTPValid && (
            <form onSubmit={otpValidationHandleSubmit(otpValidationSubmit)}>
              <VStack spacing={8} align="stretch">
                <FormControl isInvalid={!isNil(otpValidationErrors.otp)} isRequired>
                  <FormLabel htmlFor="otp">Enter OTP</FormLabel>
                  <Input
                    pr="4.5rem"
                    placeholder="Enter OTP received in your mail"
                    {...otpValidationRegister('otp', {
                      required: 'This is required',
                    })}
                  />
                  <FormErrorMessage>
                    {otpValidationErrors.otp && otpValidationErrors.otp.message}
                  </FormErrorMessage>
                </FormControl>
                <HStack align="center" justifyContent="end">
                  <Button mt={4} colorScheme="cyan" variant="solid" type="submit">
                    {validatingOTP ? (
                      <SpinnerContainer size="20px" overflow="unset" />
                    ) : (
                      'Validate OTP'
                    )}
                  </Button>
                </HStack>
              </VStack>
            </form>
          )}
          {isOTPValid && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={8} align="stretch">
                <FormControl isInvalid={!isNil(errors.newPassword)} isRequired>
                  <FormLabel htmlFor="newPassword">New Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      {...register('newPassword', {
                        required: 'This is required',
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.newPassword && errors.newPassword.message}
                  </FormErrorMessage>
                </FormControl>
                <HStack align="center" justifyContent="end">
                  <Button mt={4} colorScheme="cyan" variant="solid" type="submit">
                    {updatePasswordInProgress ? (
                      <SpinnerContainer size="20px" overflow="unset" />
                    ) : (
                      'Reset Password'
                    )}
                  </Button>
                </HStack>
              </VStack>
            </form>
          )}
        </Stack>
      </Box>
    </Layout>
  )
}
