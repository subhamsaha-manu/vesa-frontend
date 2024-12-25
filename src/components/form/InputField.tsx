import { Input } from '@chakra-ui/react'
import noop from 'lodash/noop'
import { HTMLInputTypeAttribute, ReactElement, useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: HTMLInputTypeAttribute | undefined
  fieldName: string
  placeholder?: string
  value?: string | number | undefined
  onBlurAction?: (params: any) => void
  onKeyUpAction?: (params: any, key: string) => void
  setFocus?: boolean
  disabled?: boolean
  endAdornment?: ReactElement
  startAdornment?: ReactElement
  withRoundBorders?: boolean
}

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    fieldName,
    label,
    control,
    error,
    placeholder = '',
    value,
    width,
    onBlurAction = noop,
    onKeyUpAction = noop,
    showErrorOnRight,
    testid,
    setFocus = false,
    disabled = false,
    isRequired,
    withRoundBorders = true,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (setFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [setFocus])

  return (
    <FieldWrapper
      label={label}
      error={error}
      showErrorOnRight={showErrorOnRight}
      isRequired={isRequired}
    >
      <Controller
        name={fieldName}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            variant="outline"
            ref={inputRef}
            placeholder={placeholder}
            data-testid={testid}
            width={width}
            onBlur={(e) => {
              onBlurAction(e.target.value)
            }}
            onKeyUp={(e) => {
              onKeyUpAction(inputRef.current?.value, e.key)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onBlurAction(inputRef.current?.value)
              }
            }}
            disabled={disabled}
            style={{
              border: '1px solid #ecedef',
              padding: '0 16px',
              background: `${disabled ? '#ecedef' : 'white'}`,
              borderRadius: withRoundBorders ? '40px' : '8px',
              height: '48px',
            }}
          />
        )}
      />
    </FieldWrapper>
  )
}
