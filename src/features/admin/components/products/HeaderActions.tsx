import { Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Select, SelectItem } from '@nextui-org/react'
import { SharedSelection } from '@nextui-org/system'
import { Search01Icon } from 'hugeicons-react'
import { FC } from 'react'

import { ProductStatus } from '@/types'

type HeaderActionsProps = {
  setProductStatus: (status: ProductStatus) => void
  setSearchText: (text: string) => void
}

export const HeaderActions: FC<HeaderActionsProps> = ({ setSearchText, setProductStatus }) => {
  const productStatusOptions = Object.entries(ProductStatus)

  return (
    <Flex flex=".5" justify="flex-end" align="center" gap={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search01Icon color="gray.300" size={20} />
        </InputLeftElement>
        <Input
          placeholder="Search product"
          size="md"
          background="#F9F9F9"
          borderRadius="8px"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
      <Select
        placeholder="Status"
        selectionMode="single"
        style={{
          borderRadius: '8px',
          background: '#F9F9F9',
        }}
        onSelectionChange={(keys: SharedSelection) => {
          setProductStatus(keys.currentKey as ProductStatus)
        }}
      >
        {productStatusOptions.map(([key, status]) => (
          <SelectItem key={status}>{key}</SelectItem>
        ))}
      </Select>
      <Button variant="solid" colorScheme="blue" minW="fit-content">
        Add Product
      </Button>
    </Flex>
  )
}
