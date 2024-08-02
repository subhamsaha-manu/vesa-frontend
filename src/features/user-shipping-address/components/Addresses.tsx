import React, { FC, useState } from 'react'
import { ContentLayout } from '@/components/Layout'
import { useShippingAddressesQuery } from '../apis/shippingAddresses.generated'
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { AddressCard } from './AddressCard'
import { AddressForm } from './AddressForm'
import { useAddShippingAddressMutation } from '../apis/addShippingAddress.generated'
import { shippingAddresses } from '../apis/shippingAddresses'
import { useUpdateShippingAddressMutation } from '@/features/user-shipping-address/apis/updateShippingAddress.generated'

const Addresses: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [addressId, setAddressId] = useState<string>()

  const { data, loading: fetchingAllAddresses } = useShippingAddressesQuery({
    variables: {
      userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
    },
    fetchPolicy: 'network-only',
  })

  const [addShippingAddress, { loading: addingAddress }] = useAddShippingAddressMutation({
    onCompleted: () => {
      toast({
        title: 'Address Added',
        description: 'Your address has been added successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      onClose()
    },
    refetchQueries: [
      { query: shippingAddresses, variables: { userId: '286ead03-759a-4748-a802-e2a5e1fc1371' } },
    ],
  })

  const [updateShippingAddress, { loading: updatingAddress }] = useUpdateShippingAddressMutation({
    onCompleted: () => {
      toast({
        title: 'Address Updated',
        description: 'Your address has been updated successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      onClose()
    },
    refetchQueries: [
      { query: shippingAddresses, variables: { userId: '286ead03-759a-4748-a802-e2a5e1fc1371' } },
    ],
  })

  if (fetchingAllAddresses || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <>
      <ContentLayout pageTitle="Account" showFullPageScroll>
        <Flex display-name="account-header-section" justify="space-between" w="100%">
          <Text fontSize="md" as="b" color="gray">
            Addresses
          </Text>
          <Button
            variant="solid"
            size="sm"
            color="white"
            background="black"
            onClick={onOpen}
            _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          >
            Add a New Address
          </Button>
        </Flex>

        <Flex
          display-name="addresses-section"
          w="100%"
          gap={6}
          pt="30px"
          borderTop="1px solid #d5d5d5"
          borderBottom="1px solid #d5d5d5"
          flexDir="column"
        >
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
      </ContentLayout>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p="32px">
          <ModalHeader pl="0">Add a New Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
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
                      userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
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
                      userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Addresses