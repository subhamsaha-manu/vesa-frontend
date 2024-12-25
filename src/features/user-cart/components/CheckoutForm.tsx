import { Flex } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import isNil from 'lodash/isNil'
import { FC, useEffect } from 'react'
import { FieldError, FieldValues, useController, useForm } from 'react-hook-form'
import Select from 'react-select'
import * as z from 'zod'

import { stateOptions } from '../utils/IndianStates'

import { InputField } from '@/components/form'
import { Field } from '@/components/ui/field'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { useShippingAddressLazyQuery } from '@/features/user-shipping-address/apis/shippingAddress.generated'
import {
  INVALID_EMAIL_ERROR_MESSAGE,
  INVALID_MOBILE_NUMBER_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
  NAME_IS_MANDATORY,
} from '@/utils/constants'

const schema = z.object({
  email: z.string().email(INVALID_EMAIL_ERROR_MESSAGE),
  name: z.string().min(1, NAME_IS_MANDATORY).max(50).regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
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
  selectedAddressId?: string
}

export const CheckoutForm: FC<CheckoutFormProps> = ({ onSubmit, selectedAddressId }) => {
  const {
    currentUser: { email, phoneNumber, name },
  } = useCurrentUserContext()

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const [getShippingAddress] = useShippingAddressLazyQuery({
    variables: {
      addressId: selectedAddressId!,
    },
    onCompleted: (data) => {
      setValue('addressLine1', data.shippingAddress.addressLine1)
      setValue('addressLine2', data.shippingAddress.addressLine2)
      setValue('city', data.shippingAddress.city)
      setValue('pincode', data.shippingAddress.pincode)
      setValue('state', data.shippingAddress.state)
    },
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

  useEffect(() => {
    setValue('email', email)
    setValue('name', name)
    setValue('phoneNumber', phoneNumber)
  }, [email, name, phoneNumber, setValue])

  useEffect(() => {
    if (selectedAddressId) {
      void getShippingAddress()
    }
  }, [getShippingAddress, selectedAddressId])

  const handleFormSubmit = async (values: FieldValues) => {
    onSubmit(values)
  }

  return (
    <Flex display-name="checkout-form-container" flexDir="column" gap={4}>
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
          <Field invalid={!isNil(errors.state)} required errorText="State is mandatory">
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
          </Field>
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
