import { Flex, useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'

import { RemoveAddressWarningModal } from './RemoveAddressWarningModal'

import { useRemoveShippingAddressMutation } from '../apis/removeShippingAddress.generated'
import { shippingAddresses } from '../apis/shippingAddresses'

import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { ShippingAddress } from '@/types'

type AddressCardProps = {
  address: ShippingAddress
  onEdit: (addressId: string) => void
}
export const AddressCard: FC<AddressCardProps> = ({ address, onEdit }) => {
  const { open, onOpen, onClose } = useDisclosure()

  const {
    addressId,
    name,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    pincode,
    isDefault,
    addressType,
  } = address

  const [removeShippingAddress, { loading }] = useRemoveShippingAddressMutation({
    variables: {
      addressId,
    },
    onCompleted: () => {
      toaster.create({
        title: 'Address Removed',
        description: 'Your address has been removed successfully',
        type: 'success',
        duration: 2000,
      })
      onClose()
    },
    refetchQueries: [{ query: shippingAddresses }],
  })

  return (
    <>
      <Flex
        display-name="address-card"
        w="100%"
        p={{ base: '10px', xl: '20px' }}
        bg="white"
        borderRadius={{ base: '0', xl: '8px' }}
        boxShadow="0 2px 4px 0 rgba(0,0,0,.05)"
      >
        <Flex flexDir="column" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex flexDir="column">
              <Flex pb={4}>
                <Flex as="b" fontSize="sm">
                  {name}
                </Flex>
                {isDefault && (
                  <Flex
                    ml={2}
                    px={2}
                    py={1}
                    bg="primary.500"
                    color="white"
                    fontSize="xs"
                    borderRadius="4px"
                  >
                    Default
                  </Flex>
                )}
              </Flex>
              <Flex fontSize="sm" color="gray">
                {addressType}
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column" mt={2}>
            <Flex fontSize="sm" color="gray">
              {addressLine1}
            </Flex>
            <Flex fontSize="sm" color="gray">
              {addressLine2}
            </Flex>
            <Flex fontSize="sm" color="gray">
              {`${city}, ${state}, ${country}, ${pincode}`}
            </Flex>
          </Flex>
          <Flex display-name="action-buttons" pt={6} gap={4}>
            <Button
              variant="outline"
              _hover={{ background: 'black', color: 'white', border: '1px solid black' }}
              fontSize="xs"
              borderRadius="0"
              onClick={() => onEdit(addressId)}
            >
              Edit
            </Button>
            <Button variant="outline" color="black" fontSize="xs" onClick={onOpen}>
              Delete
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <RemoveAddressWarningModal
        removeAddress={removeShippingAddress}
        toggleWarningModal={onClose}
        isOpen={open}
        showSpinner={loading}
      />
    </>
  )
}
