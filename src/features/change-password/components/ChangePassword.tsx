import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
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
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { Layout } from '@/components/Layout'

const schema = z.object({
  oldPassword: z.string().min(1, 'Required'),
  newPassword: z.string().min(1, 'Required'),
})
export const ChangePassword: FC = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const [oldPasswordValid, setOldPasswordValid] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const toast = useToast()
  const navigate = useNavigate()

  const navigateBackToApp = () => {
    navigate('/app')
  }

  const onSubmit = (values: any) => {
    const { newPassword } = values
  }

  return (
    <Layout headerText="Change Password">
      <Box
        rounded="lg"
        bg="white"
        boxShadow="lg"
        p={8}
        display-name="change-password-box-container"
      >
        <Stack spacing={4} display-name="change-password-stack-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={8} align="stretch">
              <FormControl isInvalid={!isNil(errors.oldPassword)} isRequired>
                <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                <Input
                  id="oldPassword"
                  placeholder="Old password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('oldPassword', {
                    required: 'This is required',
                  })}
                  onBlur={(event) => {}}
                />
                <FormErrorMessage>""</FormErrorMessage>
              </FormControl>
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
                <FormErrorMessage>""</FormErrorMessage>
              </FormControl>
              <HStack align="center" justifyContent="end">
                <ButtonGroup gap="4">
                  <Button
                    mt={4}
                    colorScheme="cyan"
                    variant="outline"
                    type="submit"
                    onClick={navigateBackToApp}
                  >
                    Cancel
                  </Button>
                  <Button
                    mt={4}
                    colorScheme="cyan"
                    variant="solid"
                    type="submit"
                    disabled={!oldPasswordValid}
                  >
                    {false ? <SpinnerContainer size="20px" overflow="unset" /> : 'Change Password'}
                  </Button>
                </ButtonGroup>
              </HStack>
            </VStack>
          </form>
        </Stack>
      </Box>
    </Layout>
  )
}
