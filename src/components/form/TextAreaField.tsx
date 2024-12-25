import { Text, Textarea } from '@chakra-ui/react'
import isEmpty from 'lodash/isEmpty'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

const TextAreaWrapper = styled.div`
  textarea {
    padding: 8px 16px;
    height: 42px;
    min-height: 42px;
    max-height: 200px;
    overflow-y: auto;
  }
`
type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  fieldName: string
  placeholder?: string
  value?: string
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void
  showTextLength?: boolean
  onKeyUp?: (value: string) => void
  maxLength: number
}

export const TextAreaField = (props: TextAreaFieldProps) => {
  const {
    fieldName,
    label,
    value,
    control,
    error,
    placeholder = '',
    testid,
    showTextLength = false,
    onBlur,
    onKeyUp,
    isRequired,
    maxLength,
  } = props
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState<string>('')

  useEffect(() => {
    if (value) {
      setText(value)
    }
  }, [value])

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px'
      const scrollHeight = textAreaRef.current.scrollHeight
      textAreaRef.current.style.height = scrollHeight + 'px'
    }
    // eslint-disable-next-line
  }, [textAreaRef.current, value])

  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value

    setText(val)
  }

  return (
    <FieldWrapper
      label={label}
      error={error}
      textAreaLengthText={`${text.length}/${maxLength}`}
      isRequired={isRequired}
    >
      <Controller
        name={fieldName}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <>
            <TextAreaWrapper>
              <Textarea
                {...field}
                onBlur={onBlur}
                onInput={handleChange}
                placeholder={placeholder}
                data-testid={testid}
                ref={textAreaRef}
              />
            </TextAreaWrapper>
            {showTextLength && isEmpty(error) && (
              <Text
                color={error ? 'error.100' : 'primary.80'}
                data-testid={`${testid}-text-length`}
                marginTop="16px"
              >
                {`${text.length}/${maxLength}`}
              </Text>
            )}
          </>
        )}
      />
    </FieldWrapper>
  )
}
