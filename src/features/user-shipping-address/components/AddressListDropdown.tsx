import { Flex, Select } from '@chakra-ui/react'
import { FC } from 'react'

import { useUserAddressesMinifiedQuery } from '../apis/userAddressesMinified.generated'

type AddressListDropdownProps = {
  onSelect: (addressId: string) => void
}
export const AddressListDropdown: FC<AddressListDropdownProps> = ({ onSelect }) => {
  const { data } = useUserAddressesMinifiedQuery({
    fetchPolicy: 'network-only',
  })

  return (
    <Flex display-name="address-list-dropdown">
      <Select placeholder="Saved Addresses">
        {data?.userAddressesMinified.map(({ addressId, name }) => (
          <option key={addressId} value={addressId} onClick={() => onSelect(addressId)}>
            {name}
          </option>
        ))}
      </Select>
    </Flex>
  )
}
