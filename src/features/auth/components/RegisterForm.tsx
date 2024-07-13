import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
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
import isNil from 'lodash/isNil'
import React, { useState } from 'react'
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as z from 'zod'

import { LoginWithFB } from './LoginWithFB'
import { LoginWithGmail } from './LoginWithGmail'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { useAuthenticationContext } from '@/features/auth'
import { storage } from '@/utils/storage'

type RegisterFormProps = {
  onSuccess: () => void
}

const schema = z.object({
  name: z.string().max(50).min(1),
  email: z.string().email().min(1, 'Required'),
  mobileNumber: z.string(),
  password: z.string().min(1, 'Required'),
})
export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const { setIsAuthenticated } = useAuthenticationContext()
  const toast = useToast()

  const onSignupComplete = (token: string) => {
    storage.setItem('AUTH_TOKEN', token)
    setIsAuthenticated(true)
    toast({
      title: 'Signup Successful',
      description: 'Welcome.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    onSuccess()
  }

  const onSubmit = (values: any) => {
    const { email, password, name, mobileNumber } = values
  }

  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const onSuccessGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const profileObj = (res as GoogleLoginResponse).profileObj
    setValue('name', profileObj.name)
    setValue('email', profileObj.email)
  }
  const onSuccessFB = (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    const userEmail = (userInfo as ReactFacebookLoginInfo).email!
    const userName = (userInfo as ReactFacebookLoginInfo).name!
    setValue('email', userEmail)
    setValue('name', userName)
  }
  //
  // if (error) {
  //   return <ErrorFallback />
  // }

  return (
    <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
      <Stack spacing={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={2} align="stretch">
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                {...register('name', {
                  required: 'This is required',
                })}
              />
              <FormHelperText>Any name you want us to remember you by</FormHelperText>
            </FormControl>
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
              <FormErrorMessage data-testid="login-email-error-message">""</FormErrorMessage>
              <FormHelperText>We never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="mobileNumber">Mobile</FormLabel>
              <Input
                id="mobileNumber"
                placeholder="Mobile Number"
                type="text"
                {...register('mobileNumber', {})}
              />
              <FormHelperText>Provide number to get sms alert</FormHelperText>
            </FormControl>
            <FormControl isInvalid={!isNil(errors.password)} isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
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
              <FormErrorMessage>""</FormErrorMessage>
            </FormControl>
            <HStack align="center" justifyContent="space-between">
              <Link to="/auth/login">
                <Text color="blue.400">Login to existing Account</Text>
              </Link>
              <Button
                mt={4}
                colorScheme="cyan"
                variant="outline"
                isLoading={false}
                type="submit"
                role="button"
              >
                {false ? <SpinnerContainer size="20px" overflow="unset" /> : 'Submit'}
              </Button>
            </HStack>
            <Divider />
            <VStack display-name="sign-up-with-google-fb-section" spacing={2}>
              <LoginWithGmail onSuccessFn={onSuccessGoogle} buttonText="Sign up with Gmail" />
              <LoginWithFB onSuccessFn={onSuccessFB} buttonText="Sign up with Facebook" />
            </VStack>
          </VStack>
        </form>
      </Stack>
    </Box>
  )
}
