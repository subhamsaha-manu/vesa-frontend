import { FormControl, FormErrorMessage, FormLabel, Heading } from '@chakra-ui/react'
import * as React from 'react'
import { Control, FieldError } from 'react-hook-form'

type FieldWrapperProps = {
  children: React.ReactNode
  control?: Control
  error: FieldError
  label: string
  width?: number
  showErrorOnRight?: boolean
  testid?: string
  disableWithSelectedOption?: boolean
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children'>

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, children, error, showErrorOnRight = false, testid } = props
  return (
    <FormControl
      data-testid={testid}
      style={{
        display: 'flex',
        flexDirection: showErrorOnRight ? 'row' : 'column',
      }}
    >
      <FormLabel>
        <Heading size="xs">{label}</Heading>
      </FormLabel>
      {children}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  )
}
