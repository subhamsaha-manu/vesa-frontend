import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from 'lodash'
import isNil from 'lodash/isNil'
import React, { useState } from 'react'
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { LoginWithFB } from './LoginWithFB'
import { LoginWithGmail } from './LoginWithGmail'

import { useForgotPasswordMutation } from '../apis/forgotPassword.generated'
import { useIsLoginViaSocialAppSuccessfulLazyQuery } from '../apis/isLoginViaSocialAppSuccessful.generated'
import { useLoginMutation } from '../apis/login.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { useAuthenticationContext } from '@/features/auth'
import { ErrorFallback } from '@/providers/app'
import { storage } from '@/utils/storage'

const schema = z.object({
  email: z.string().email().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
})

type LoginFormProps = {
  onSuccess: () => void
}
export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const navigate = useNavigate()

  const { setIsAuthenticated } = useAuthenticationContext()

  const onLoginCompletion = (token: string) => {
    if (!token) {
      toast({
        title: 'Check your email or password.',
        description: 'Kindly signup',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return null
    }

    storage.setToken('AUTH_TOKEN', token)
    setIsAuthenticated(true)

    toast({
      title: 'Login successful.',
      description: 'Welcome back.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    onSuccess()
  }

  const [loginUser, { error, loading: loginInProgress }] = useLoginMutation({
    onCompleted: (data) => {
      const { token } = data.login
      onLoginCompletion(token)
    },
  })

  const [isLoginViaSocialAppSuccessful] = useIsLoginViaSocialAppSuccessfulLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const { token } = data.isLoginViaSocialAppSuccessful
      onLoginCompletion(token)
    },
  })

  const [forgotPassword, { loading: generatingOTP }] = useForgotPasswordMutation({
    onCompleted: (data) => {
      if (data.forgotPassword) {
        const userEmail = getValues('email')
        toast({
          title: 'OTP sent at your email',
          description: 'Use it to reset password',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        navigate(`/reset-password/${userEmail}`)
      } else {
        toast({
          title: 'OTP could not be sent at your email',
          description: 'Check if email is correct or try again later',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    },
  })

  const onSubmit = (values: any) => {
    const { email, password } = values
    loginUser({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
  }

  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const toast = useToast()

  const onSuccessGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const profileObj = (res as GoogleLoginResponse).profileObj
    setValue('email', profileObj.email)
    isLoginViaSocialAppSuccessful({
      variables: {
        email: profileObj.email,
      },
    })
  }
  const onSuccessFB = (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    const userEmail = (userInfo as ReactFacebookLoginInfo).email!
    setValue('email', userEmail)
    isLoginViaSocialAppSuccessful({
      variables: {
        email: userEmail,
      },
    })
  }

  if (error) {
    return <ErrorFallback />
  }
  return (
    <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
      <Stack spacing={4}>
        <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
          <VStack spacing={8} align="stretch">
            <FormControl isInvalid={!isNil(errors.email)} isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                {...register('email', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage data-testid="login-email-error-message">
                {errors.email && errors.email.message}
              </FormErrorMessage>
              <FormHelperText>We never share your email.</FormHelperText>
            </FormControl>
            <FormControl isInvalid={!isNil(errors.password)} isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  data-testid="password-input"
                  {...register('password', {
                    required: 'This is required',
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <Flex display-name="forgot-password-flex">
              <Button
                variant="ghost"
                colorScheme="teal"
                onClick={() => {
                  const userEmail = getValues('email')
                  if (isEmpty(userEmail)) {
                    const error = {
                      message: 'Kindly provide email',
                      type: 'unique',
                    }
                    setError('email', error)
                  } else {
                    forgotPassword({
                      variables: {
                        email: userEmail,
                      },
                    })
                  }
                }}
              >
                {generatingOTP ? (
                  <SpinnerContainer size="20px" overflow="unset" />
                ) : (
                  'Forgot Password'
                )}
              </Button>
            </Flex>
            <HStack align="center" justifyContent="space-between">
              <Link to="/auth/register">
                <Text color="blue.400">Create Account</Text>
              </Link>
              <Button mt={4} colorScheme="cyan" variant="outline" type="submit">
                {loginInProgress ? <SpinnerContainer size="20px" overflow="unset" /> : 'Submit'}
              </Button>
            </HStack>
            <Divider />
            <VStack display-name="login-with-google-fb-section" spacing={2}>
              <LoginWithGmail onSuccessFn={onSuccessGoogle} buttonText="Sign in with Gmail" />
              <LoginWithFB onSuccessFn={onSuccessFB} buttonText="Login with Facebook" />
            </VStack>
          </VStack>
        </form>
      </Stack>
    </Box>
  )
}
