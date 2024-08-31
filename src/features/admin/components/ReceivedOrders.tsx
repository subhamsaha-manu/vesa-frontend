import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import moment from 'moment'
import { FC } from 'react'
import './table.css'
import { MinifiedReceivedOrder } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'
import { Link } from 'react-router-dom'
import round from 'lodash/round'
import { startCase } from 'lodash'

type ReceivedOrdersProps = {
  data: Array<MinifiedReceivedOrder>
}

export const ReceivedOrders: FC<ReceivedOrdersProps> = ({ data }) => {
  return (
    <TableContainer>
      <Table variant="outline">
        <Thead background="gray.50">
          <Tr>
            <Th fontSize="sm" className="fixed-header">
              Order ID
            </Th>
            <Th fontSize="sm">Billing Name</Th>
            <Th fontSize="sm">Date</Th>
            <Th fontSize="sm">Total</Th>
            <Th fontSize="sm">Order Status</Th>
            <Th fontSize="sm">Payment Method</Th>
            <Th fontSize="sm">View Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(({ orderId, name, orderDate, orderTotal, orderStatus, modeOfPayment }) => (
            <Tr key={orderId}>
              <Td className="fixed-cell">{orderId.substring(0, 7)}</Td>
              <Td>{name}</Td>
              <Td>{moment(orderDate).format('DD-MM-YYYY')}</Td>
              <Td>{`${INR_CURRENCY_SYMBOL} ${round(orderTotal, 2)}`}</Td>
              <Td>{orderStatus}</Td>
              <Td>{startCase(modeOfPayment.replace('_', ' '))}</Td>
              <Td>
                <Link to={`/admin/order/${orderId}`}>
                  <Button
                    variant="outline"
                    size={{ base: 'xs', xl: 'sm' }}
                    color="black"
                    _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
                  >
                    View Details
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
