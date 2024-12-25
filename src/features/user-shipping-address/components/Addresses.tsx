import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { FC, useState } from 'react'

import { AddressCard } from './AddressCard'
import { AddressForm } from './AddressForm'

import { useAddShippingAddressMutation } from '../apis/addShippingAddress.generated'
import { shippingAddresses } from '../apis/shippingAddresses'
import { useShippingAddressesQuery } from '../apis/shippingAddresses.generated'
import { useUpdateShippingAddressMutation } from '../apis/updateShippingAddress.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from '@/components/ui/dialog'
import { toaster } from '@/components/ui/toaster'

const Addresses: FC = () => {
  const { open, onOpen, onClose } = useDisclosure()
  const [addressId, setAddressId] = useState<string>()

  const { data, loading: fetchingAllAddresses } = useShippingAddressesQuery({
    fetchPolicy: 'network-only',
  })

  const [addShippingAddress, { loading: addingAddress }] = useAddShippingAddressMutation({
    onCompleted: () => {
      toaster.create({
        title: 'Address Added',
        description: 'Your address has been added successfully',
        type: 'success',
        duration: 2000,
      })
      onClose()
    },
    refetchQueries: [{ query: shippingAddresses }],
  })

  const [updateShippingAddress, { loading: updatingAddress }] = useUpdateShippingAddressMutation({
    onCompleted: () => {
      toaster.create({
        title: 'Address Updated',
        description: 'Your address has been updated successfully',
        type: 'success',
        duration: 2000,
      })
      onClose()
    },
    refetchQueries: [{ query: shippingAddresses }],
  })

  if (fetchingAllAddresses || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <>
      <Flex w="100%" flexDir="column" gap={5}>
        <Flex
          display-name="addresses-header-section"
          p={{ base: '10px', xl: '0' }}
          justify="space-between"
          w="100%"
        >
          <Text fontSize="md" as="b" color="gray">
            Addresses
          </Text>
          <Button
            variant="solid"
            size={{ base: 'xs', xl: 'sm' }}
            color="white"
            background="black"
            onClick={onOpen}
            _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          >
            Add a New Address
          </Button>
        </Flex>

        <Flex display-name="addresses-section" w="100%" gap={6} pt="30px" flexDir="column">
          {data.shippingAddresses.length === 0 && (
            <Text fontSize="md" color="gray">
              No addresses found
            </Text>
          )}
          {data.shippingAddresses.map((address) => (
            <AddressCard
              key={address.addressId}
              address={address}
              onEdit={(value) => {
                setAddressId(value)
                onOpen()
              }}
            />
          ))}
        </Flex>
      </Flex>

      <DialogRoot open={open} onOpenChange={onClose} placement="center">
        <DialogBackdrop />
        <DialogContent p="32px">
          <DialogHeader pl="0">Add a New Address</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody p="0">
            <AddressForm
              onSubmit={(values) => {
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
                } = values

                if (name && !addressId) {
                  void addShippingAddress({
                    variables: {
                      input: {
                        name,
                        addressLine1,
                        addressLine2,
                        city,
                        state,
                        country,
                        pincode,
                        addressType,
                        isDefault,
                      },
                    },
                  })
                }
                if (name && addressId) {
                  void updateShippingAddress({
                    variables: {
                      addressId,
                      input: {
                        name,
                        addressLine1,
                        addressLine2,
                        city,
                        state,
                        country,
                        pincode,
                        addressType,
                        isDefault,
                      },
                    },
                  })
                }
              }}
              showSpinner={addingAddress || updatingAddress}
              addressId={addressId}
            />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default Addresses
