import { Select } from '@chakra-ui/react'
import React from 'react'
import { Controller } from 'react-hook-form'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

export type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Array<any>
  fieldName: string
  placeholder?: string
  disabled?: boolean
  selectedOption?: string
}

export const SelectField = (props: SelectFieldProps) => {
  const {
    fieldName,
    options,
    label,
    control,
    error,
    placeholder = '',
    disabled = false,
    selectedOption = '',
  } = props
  return (
    <FieldWrapper label={label} error={error}>
      <Controller
        name={fieldName}
        control={control}
        defaultValue={selectedOption}
        render={({ field: { onChange, ref } }) => (
          <Select
            {...ref}
            id={`${fieldName}-select`}
            data-testid={`${fieldName}-select`}
            placeholder={placeholder}
            variant="default"
            disabled={disabled}
          >
            {options.map(({ id, subject }) => (
              <option key={id} value={subject} data-testid="select-option">
                {subject}
              </option>
            ))}
          </Select>
        )}
      />
    </FieldWrapper>
  )
}
