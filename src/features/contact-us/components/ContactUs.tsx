import React, { FC } from 'react'
import { useContactUsMutation } from '../apis/contactUs.generated'
import * as z from 'zod'
import {
  INVALID_EMAIL_ERROR_MESSAGE,
  INVALID_MOBILE_NUMBER_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
  NAME_IS_MANDATORY,
} from '@/utils/constants'
import { FieldError, FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Heading, useToast } from '@chakra-ui/react'
import { InputField } from '@/components/form'
import { ContentLayout } from '@/components/Layout'
import { Text } from '@chakra-ui/layout'
import { SpinnerContainer } from '@/components/elements/Spinner'

const schema = z.object({
  name: z.string().min(1, NAME_IS_MANDATORY).max(50).regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
    message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  }),
  email: z.string().email(INVALID_EMAIL_ERROR_MESSAGE),
  phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: INVALID_MOBILE_NUMBER_ERROR_MESSAGE,
  }),
})
export const ContactUs: FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const toast = useToast()

  const [contactUs, { loading }] = useContactUsMutation({
    onCompleted: () => {
      toast({
        title: 'Hang tight',
        description: 'We will get back to you soon!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      reset()
    },
  })

  const handleFormSubmit = async (values: FieldValues) => {
    const { name, email, phoneNumber } = values
    void contactUs({ variables: { name, email, phoneNumber } })
  }

  return (
    <ContentLayout pageTitle="Customer Service" showHeaderTitle>
      <Flex
        display-name="contact-us-container"
        w="100%"
        gap={{ base: '24px', xl: '240px' }}
        flexDir={{ base: 'column', xl: 'row' }}
      >
        <Flex display-name="contact-us-form-container" flexDir="column" flexGrow={1} gap={4}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Flex flexDir="column" gap={4} align="stretch">
              <InputField
                fieldName="name"
                label="Full Name"
                control={control}
                error={errors['name'] as FieldError}
                isRequired
                value=""
              />
              <InputField
                fieldName="email"
                label="Email Address"
                control={control}
                error={errors['email'] as FieldError}
                isRequired
                value=""
              />
              <InputField
                fieldName="phoneNumber"
                label="Phone"
                control={control}
                error={errors['phoneNumber'] as FieldError}
                isRequired
                value=""
              />
              <Button
                variant="solid"
                size="lg"
                color="white"
                background="black"
                _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
                borderRadius="40px"
                onClick={handleFormSubmit}
                w="100%"
                fontSize="25px"
                fontWeight="300"
                type="submit"
                leftIcon={loading ? <SpinnerContainer size="20px" overflow="unset" /> : <> </>}
              >
                Contact Us
              </Button>
            </Flex>
          </form>
        </Flex>
        <Flex
          display-name="support-details"
          flexGrow={1}
          flexDir="column"
          gap={6}
          align="center"
          h="100%"
          justify="center"
        >
          <Heading size="lg">Support</Heading>
          <Flex flexDir="column" gap={4} textAlign="center">
            <Flex gap={2}>
              <Heading size="sm" fontWeight="bold">
                Timing
              </Heading>
              <Text> Mon - Fri: 9:00 AM - 6:00 PM</Text>
            </Flex>
            <Flex gap={2}>
              <Heading size="sm" fontWeight="bold">
                Email
              </Heading>
              <Text>mail.team.vesa@gmail.com</Text>
            </Flex>
            <Flex gap={2}>
              <Heading size="sm" fontWeight="bold">
                Phone
              </Heading>
              <Text>+91 9003212321</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ContentLayout>
  )
}

export default ContactUs
