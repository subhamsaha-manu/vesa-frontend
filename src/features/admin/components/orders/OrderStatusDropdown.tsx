import { Button } from '@chakra-ui/react/button'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SharedSelection,
} from '@nextui-org/react'
import { FC } from 'react'

import { OrderStatus } from '@/types'

type OrderStatusDropdownProps = {
  currentStatus: OrderStatus
  onStatusChange: (status: OrderStatus) => void
}

export const OrderStatusDropdown: FC<OrderStatusDropdownProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  const orderStatusOptions = Object.values(OrderStatus).map((status) => (
    <DropdownItem key={status}>{status}</DropdownItem>
  ))

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Order Status - {currentStatus}</Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="Update Order Status"
        selectedKeys={[currentStatus]}
        selectionMode="single"
        onSelectionChange={(keys: SharedSelection) => {
          onStatusChange(keys.currentKey as OrderStatus)
        }}
      >
        {orderStatusOptions}
      </DropdownMenu>
    </Dropdown>
  )
}
