import { Flex, Heading } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect } from 'react'
import { FieldError, FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { useRegisterMutation } from '../apis/register.generated'

import { InputField } from '@/components/form'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { AuthByType } from '@/types'
import {
  INVALID_EMAIL_ERROR_MESSAGE,
  INVALID_MOBILE_NUMBER_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
  NAME_IS_MANDATORY,
  USER_ID,
} from '@/utils/constants'
import { storage } from '@/utils/storage'

const schema = z.object({
  name: z.string().min(1, NAME_IS_MANDATORY).max(50).regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
    message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  }),
  email: z.string().email(INVALID_EMAIL_ERROR_MESSAGE),
  phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: INVALID_MOBILE_NUMBER_ERROR_MESSAGE,
  }),
})

type UserBasicDetailsProps = {
  sendTo: string
  authBy: AuthByType
}
export const UserBasicDetails: FC<UserBasicDetailsProps> = ({ sendTo, authBy }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (authBy === AuthByType.Email) {
      setValue('email', sendTo)
    } else {
      setValue('phoneNumber', sendTo)
    }
  }, [authBy, sendTo, setValue])

  const [register, { loading }] = useRegisterMutation({
    onCompleted: (data) => {
      storage.setItem(USER_ID, data.register)
      toaster.create({
        title: 'Account created',
        description: 'You have successfully created your account.',
        type: 'success',
        duration: 2000,
      })
      navigate('/')
    },
  })

  const handleFormSubmit = async (values: FieldValues) => {
    const { name, email, phoneNumber } = values
    void register({ variables: { input: { name, email, phoneNumber } } })
  }

  return (
    <>
      <Flex display-name="verify-otp-step-heading" justify="center">
        <Heading fontSize={{ base: 'md', xl: '2xl' }}>Your basic details</Heading>
      </Flex>
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
            disabled={authBy === AuthByType.Email}
          />
          <InputField
            fieldName="phoneNumber"
            label="Phone"
            control={control}
            error={errors['phoneNumber'] as FieldError}
            isRequired
            value=""
            disabled={authBy === AuthByType.Phone}
          />
          <Button
            variant="solid"
            size="lg"
            color="white"
            background="black"
            _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
            borderRadius="40px"
            fontSize="25px"
            fontWeight="400"
            disabled={loading}
            loading={loading}
            type="submit"
          >
            Save Details
          </Button>
        </Flex>
      </form>
    </>
  )
}
