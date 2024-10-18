import React, { FC } from 'react'
import { FieldError, FieldValues, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from '@/components/form'
import { Flex } from '@chakra-ui/react'

const schema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is mandatory').max(50),
})

type AuthByEmailProps = {
  onSubmit: (values: FieldValues) => void
  showSpinner: boolean
}

export const AuthByEmail: FC<AuthByEmailProps> = ({ onSubmit, showSpinner }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const handleFormSubmit = async (values: FieldValues) => {
    onSubmit(values)
  }

  return (
    <Flex display-name="auth-by-email-form-container" flexDir="column" gap={4}>
      <form onSubmit={handleSubmit(handleFormSubmit)} id="auth-form">
        <Flex flexDir="column" gap={6} align="stretch">
          <InputField
            fieldName="email"
            placeholder="Email id"
            control={control}
            error={errors['email'] as FieldError}
            isRequired
            disabled={showSpinner}
          />
        </Flex>
      </form>
    </Flex>
  )
}
