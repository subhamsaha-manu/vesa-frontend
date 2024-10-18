import React, { FC } from 'react'
import { FieldError, FieldValues, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from '@/components/form'
import { Flex } from '@chakra-ui/react'

const schema = z.object({
  phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: 'Invalid mobile number',
  }),
})

type AuthByPhoneProps = {
  onSubmit: (values: FieldValues) => void
  showSpinner: boolean
}

export const AuthByPhone: FC<AuthByPhoneProps> = ({ onSubmit, showSpinner }) => {
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
    <Flex display-name="auth-by-phone-form-container" flexDir="column" gap={4}>
      <form onSubmit={handleSubmit(handleFormSubmit)} id="auth-form">
        <Flex flexDir="column" gap={6} align="stretch">
          <InputField
            fieldName="phoneNumber"
            placeholder="Phone number"
            control={control}
            error={errors['phoneNumber'] as FieldError}
            isRequired
            disabled={showSpinner}
          />
        </Flex>
      </form>
    </Flex>
  )
}
