import { Input } from '@chakra-ui/react'
import React from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types/form'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email'
  fieldName: string
  placeholder?: string
  value?: string
  disabled?: boolean
  register: UseFormRegister<any>
  styleProps?: { height: number }
}

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    fieldName,
    label,
    error,
    placeholder = '',
    showErrorOnRight,
    testid,
    register,
    styleProps,
  } = props

  return (
    <FieldWrapper label={label} error={error} showErrorOnRight={showErrorOnRight}>
      <Input
        data-testid={testid}
        id={fieldName}
        placeholder={placeholder}
        type={type}
        {...styleProps}
        {...register(fieldName)}
      />
    </FieldWrapper>
  )
}
