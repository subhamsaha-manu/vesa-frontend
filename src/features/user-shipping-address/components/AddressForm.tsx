import React, { FC, useEffect, useState } from 'react'
import * as z from 'zod'
import {
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
} from '@/utils/constants'
import { FieldError, FieldValues, useController, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react'
import { InputField } from '@/components/form'
import isNil from 'lodash/isNil'
import Select from 'react-select'
import { stateOptions } from '@/features/user-cart/utils/IndianStates'
import { AddressType } from '@/types'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { useShippingAddressLazyQuery } from '@/features/user-shipping-address/apis/shippingAddress.generated'

const schema = z.object({
  name: z
    .string()
    .min(1, 'Name is mandatory')
    .max(50)
    .regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
      message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
    }),
  addressLine1: z.string().min(1, 'Street Address is mandatory'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City/Town is mandatory'),
  country: z.string().min(1, 'Country is mandatory'),
  state: z.string().min(1, 'State is mandatory'),
  pincode: z.string().min(1, 'Pincode is mandatory').max(7, 'Pincode should be 6 digits'),
  addressType: z.string().min(1, 'Address Type is mandatory'),
  isDefault: z.boolean(),
})

type AddressFormProps = {
  onSubmit: (values: FieldValues) => void
  showSpinner: boolean
  addressId?: string
}
export const AddressForm: FC<AddressFormProps> = ({ onSubmit, showSpinner, addressId }) => {
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

  const [isDefaultChecked, setIsDefaultChecked] = useState<boolean>(false)
  const [addressType, setAddressType] = useState<AddressType>(AddressType.Home)

  const {
    field: { value: state, onChange: onStateChange, ...restStateFieldProps },
  } = useController({
    name: 'state',
    control,
  })

  const [fetchAddress, { loading }] = useShippingAddressLazyQuery({
    variables: {
      userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
      addressId: addressId!,
    },
    onCompleted: (data) => {
      const {
        name,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        pincode,
        addressType,
        isDefault,
      } = data.shippingAddress
      setValue('name', name)
      setValue('addressLine1', addressLine1)
      setValue('addressLine2', addressLine2)
      setValue('city', city)
      setValue('state', state)
      setValue('country', country)
      setValue('pincode', pincode)
      setValue('addressType', addressType)
      setAddressType(addressType)
      setValue('isDefault', isDefault)
      setIsDefaultChecked(isDefault)
    },
  })

  useEffect(() => {
    if (addressId) {
      void fetchAddress()
    }
  }, [])

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
    <Flex display-name="checkout-form-container" flexDir="column" gap={4}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Flex flexDir="column" gap={6} align="stretch">
          <InputField
            fieldName="name"
            placeholder="Save address as"
            control={control}
            error={errors['name'] as FieldError}
            isRequired
          />
          <InputField
            fieldName="addressLine1"
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
              placeholder="Town/City"
              control={control}
              error={errors['city'] as FieldError}
              isRequired
            />

            <InputField
              fieldName="country"
              value="India"
              control={control}
              error={errors['city'] as FieldError}
              disabled
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
            fieldName="pincode"
            placeholder="PIN Code"
            control={control}
            error={errors['pincode'] as FieldError}
            isRequired
          />
          <Text fontSize="md" as="b" color="gray">
            Address Type
          </Text>
          <FormControl display="flex" alignItems="center" isRequired>
            <RadioGroup
              defaultValue={addressType}
              value={addressType}
              onChange={(value) => setAddressType(value as AddressType)}
            >
              <Stack spacing={4} direction="row">
                <Radio value={AddressType.Home} {...register('addressType')}>
                  Home
                </Radio>
                <Radio value={AddressType.Work} {...register('addressType')}>
                  Work
                </Radio>
                <Radio value={AddressType.Other} {...register('addressType')}>
                  Other
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="isDefault" mb="0">
              Default Address
            </FormLabel>
            <Switch
              id="isDefault"
              {...register('isDefault')}
              isChecked={isDefaultChecked}
              onChange={() => setIsDefaultChecked(!isDefaultChecked)}
            />
          </FormControl>
          <Button
            variant="solid"
            size="lg"
            color="white"
            background="black"
            _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
            borderRadius="40px"
            onClick={handleFormSubmit}
            w="100%"
            fontSize="25px"
            fontWeight="300"
            type="submit"
            leftIcon={showSpinner ? <SpinnerContainer size="20px" overflow="unset" /> : <> </>}
          >
            {addressId ? 'Update Address' : 'Add Address'}
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
