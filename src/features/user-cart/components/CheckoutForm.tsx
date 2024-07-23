import React, { FC } from 'react'
import {
  INVALID_MOBILE_NUMBER_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
} from '@/utils/constants'
import * as z from 'zod'
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  useController,
  useForm,
} from 'react-hook-form'
import Select from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react'
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
  streetAddress: z.string().min(1, 'Street Address is mandatory'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'Town is mandatory'),
  pincode: z.string().min(1, 'Pincode is mandatory').max(7, 'Pincode should be 6 digits'),
  state: z.string().min(1, 'State is mandatory'),
  mobileNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: INVALID_MOBILE_NUMBER_ERROR_MESSAGE,
  }),
})
export const CheckoutForm: FC = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const toast = useToast()

  const isFieldError = (
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  ): error is FieldError => {
    return (error as FieldError).message !== undefined
  }

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

  const onSubmit = async (values: FieldValues) => {
    console.info({ values })
  }

  return (
    <Flex display-name="register-form-container" flexDir="column" gap={4}>
      <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
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
            fieldName="streetAddress"
            label="Street Address"
            placeholder="House Number and street name"
            control={control}
            error={errors['streetAddress'] as FieldError}
            isRequired
          />
          <InputField
            fieldName="apartment"
            placeholder="Apartment, suite, unit etc. (optional)"
            control={control}
            error={errors['apartment'] as FieldError}
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
            fieldName="mobileNumber"
            label="Phone"
            control={control}
            error={errors['mobileNumber'] as FieldError}
            isRequired
          />
        </Flex>
      </form>
    </Flex>
  )
}
