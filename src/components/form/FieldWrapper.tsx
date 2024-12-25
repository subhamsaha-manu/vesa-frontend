import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Control, FieldError } from 'react-hook-form'

import { Field } from '@/components/ui/field'

type FieldWrapperProps = {
  children: ReactNode
  control?: Control
  error?: FieldError
  label?: string
  width?: number
  showErrorOnRight?: boolean
  testid?: string
  textAreaLengthText?: string
  isRequired?: boolean
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children'>

export const FieldWrapper = (props: FieldWrapperProps) => {
  const {
    label,
    children,
    testid,
    error,
    showErrorOnRight = false,
    isRequired,
    textAreaLengthText,
  } = props

  return (
    <Field
      invalid={!!error?.message}
      data-testid={testid}
      style={{
        display: 'flex',
        flexDirection: showErrorOnRight ? 'row' : 'column',
        width: '100%',
        position: 'relative',
      }}
      label={label}
      required={isRequired}
      errorText={error?.message}
    >
      <Box display-name="field-wrapper-box-div" w={showErrorOnRight ? '50%' : '100%'}>
        {children}
      </Box>
    </Field>
  )
}
