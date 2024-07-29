import React, { FC } from 'react'
import {
  INVALID_MOBILE_NUMBER_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
} from '@/utils/constants'
import * as z from 'zod'
import { FieldError, FieldValues, useController, useForm } from 'react-hook-form'
import Select from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, FormControl, FormErrorMessage } from '@chakra-ui/react'
import isNil from 'lodash/isNil'
import { stateOptions } from '../utils/IndianStates'
import { InputField } from '@/components/form'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  name: z
    .string()
    .min(1, 'Name is mandatory')
    .max(50)
    .regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
      message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
    }),
  addressLine1: z.string().min(1, 'Street Address is mandatory'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'Town is mandatory'),
  pincode: z.string().min(1, 'Pincode is mandatory').max(7, 'Pincode should be 6 digits'),
  state: z.string().min(1, 'State is mandatory'),
  phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: INVALID_MOBILE_NUMBER_ERROR_MESSAGE,
  }),
})

type CheckoutFormProps = {
  onSubmit: (values: FieldValues) => void
}

export const CheckoutForm: FC<CheckoutFormProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const {
    field: { value: state, onChange: onStateChange, ...restStateFieldProps },
  } = useController({
    name: 'state',
    control,
  })

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 48,
      minHeight: 48,
      borderRadius: 40,
      borderColor: errors.state ? 'red' : base.borderColor,
    }),
  }

  const handleFormSubmit = async (values: FieldValues) => {
    onSubmit(values)
  }

  return (
    <Flex display-name="register-form-container" flexDir="column" gap={4}>
      <form id="hook-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Flex flexDir="column" gap={4} align="stretch">
          <InputField
            fieldName="email"
            label="Email Address"
            control={control}
            error={errors['email'] as FieldError}
            isRequired
          />
          <InputField
            fieldName="name"
            label="Full Name"
            control={control}
            error={errors['name'] as FieldError}
            isRequired
          />
          <InputField
            fieldName="addressLine1"
            label="Street Address"
            placeholder="House Number and street name"
            control={control}
            error={errors['addressLine1'] as FieldError}
            isRequired
          />
          <InputField
            fieldName="addressLine2"
            placeholder="Apartment, suite, unit etc. (optional)"
            control={control}
            error={errors['addressLine2'] as FieldError}
          />
          <Flex gap={4}>
            <InputField
              fieldName="city"
              label="Town/City"
              control={control}
              error={errors['city'] as FieldError}
              isRequired
            />

            <InputField
              fieldName="pincode"
              label="PIN Code"
              control={control}
              error={errors['pincode'] as FieldError}
              isRequired
            />
          </Flex>
          <FormControl isInvalid={!isNil(errors.state)} isRequired>
            <Select
              isClearable
              isSearchable
              options={stateOptions}
              value={state ? stateOptions.find((x) => x.value === state) : state}
              onChange={(option) => onStateChange(option ? option.value : option)}
              placeholder="Select State"
              styles={customStyles}
              {...restStateFieldProps}
            />
            <FormErrorMessage>{errors.state && 'State is mandatory'}</FormErrorMessage>
          </FormControl>
          <InputField
            fieldName="phoneNumber"
            label="Phone"
            control={control}
            error={errors['phoneNumber'] as FieldError}
            isRequired
          />
        </Flex>
      </form>
    </Flex>
  )
}
