import { Flex } from '@chakra-ui/react'
import { Select, SelectItem } from '@nextui-org/react'
import { SharedSelection } from '@nextui-org/system'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchInput from '@/components/elements/SearchInput'
import { Button } from '@/components/ui/button'
import { ProductStatus } from '@/types'

type HeaderActionsProps = {
  setProductStatus: (status: ProductStatus) => void
  setSearchText: (text: string) => void
}

export const HeaderActions: FC<HeaderActionsProps> = ({ setSearchText, setProductStatus }) => {
  const productStatusOptions = Object.entries(ProductStatus)

  const navigate = useNavigate()

  return (
    <Flex flex=".5" justify="flex-end" align="center" gap={4}>
      <SearchInput onSearch={setSearchText} placeholder="Search Product" />
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
      <Button
        variant="solid"
        colorScheme="blue"
        minW="fit-content"
        onClick={() => navigate('/admin/product/add')}
      >
        Add Product
      </Button>
    </Flex>
  )
}
