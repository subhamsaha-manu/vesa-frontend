import { Flex } from '@chakra-ui/react'
import { Select, SelectItem } from '@nextui-org/select'
import { FC } from 'react'

import { useUserAddressesMinifiedQuery } from '../apis/userAddressesMinified.generated'

type AddressListDropdownProps = {
  onSelect: (addressId: string) => void
}
export const AddressListDropdown: FC<AddressListDropdownProps> = ({ onSelect }) => {
  const { data } = useUserAddressesMinifiedQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const defaultAddress = data.userAddressesMinified.find(({ isDefault }) => isDefault)
      if (defaultAddress) {
        onSelect(defaultAddress.addressId)
      }
    },
  })

  if (!data) {
    return null
  }

  return (
    <Flex display-name="address-list-dropdown" flex="1">
      <Select
        isRequired
        label="Select Address"
        onChange={(e) => onSelect(e.target.value)}
        defaultSelectedKeys={[
          data.userAddressesMinified.find(({ isDefault }) => isDefault)!.addressId,
        ]}
        color="primary"
        variant="faded"
      >
        {data.userAddressesMinified.map(({ addressId, name }) => (
          <SelectItem key={addressId} value={addressId}>
            {name}
          </SelectItem>
        ))}
      </Select>
    </Flex>
  )
}
