import { StarIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout'
import { useCurrentUserQuery } from '@/features/auth/apis/currentUser.generated'
import { ErrorFallback } from '@/providers/app'

const schema = z.object({
  name: z.string().nonempty().max(50),
  email: z.string().email().min(1, 'Required'),
  mobileNumber: z.string(),
  stars: z.string(),
  score: z.string(),
})

export const MyAccount: React.FC = () => {
  const { data, loading, error } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
  })

  const navigate = useNavigate()

  const { handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })

  if (loading) {
    return <SpinnerContainer height="60vh" />
  }

  if (!data?.currentUser || error) {
    return <ErrorFallback />
  }

  const { name, stars, email, score, mobileNumber } = data.currentUser

  const onSubmit = (values: any) => {}

  return (
    <ContentLayout pageTitle="User Account">
      <VStack
        display-name="my-account-container"
        w="100%"
        alignItems="center"
        justifyContent="center"
        zIndex="5"
      >
        <Box rounded="lg" bg="azure" boxShadow="lg" p={8} w={{ base: '90%', md: '40%' }}>
          <VStack spacing={4} w="100%">
            <Flex display-name="my-account-avatar-container" w="100%" justifyContent="center">
              <Avatar size="2xl" name={name} bg="cyan.400" />
            </Flex>
            <Flex display-name="my-account-divider" w="100%" h="2px" bg="black" />
            <Flex display-name="my-account-form-container" w="100%">
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <VStack spacing={3} w="100%" alignItems="start">
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input id="name" placeholder="Name" type="text" value={name} readOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" placeholder="Name" type="text" value={email} readOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="mobileNumber">Mobile</FormLabel>
                    <Input
                      id="mobileNumber"
                      placeholder="Mobile"
                      type="text"
                      value={mobileNumber ?? ''}
                      readOnly
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="score">Total Points</FormLabel>
                    <Input id="score" placeholder="Mobile" type="text" value={score} readOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="stars">
                      Total Stars {<StarIcon color="#FFD229" />}
                    </FormLabel>
                    <Input id="stars" placeholder="Stars" type="text" value={stars} readOnly />
                  </FormControl>
                  <HStack align="center" justifyContent="end" w="100%">
                    <Button
                      mt={4}
                      colorScheme="cyan"
                      variant="outline"
                      role="button"
                      onClick={() => navigate('/app')}
                    >
                      Back
                    </Button>
                  </HStack>
                </VStack>
              </form>
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </ContentLayout>
  )
}
