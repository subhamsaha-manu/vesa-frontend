import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { EyeIcon } from 'hugeicons-react'
import round from 'lodash/round'
import startCase from 'lodash/startCase'
import moment from 'moment'
import { ChangeEvent, FC, Key, useCallback, useMemo } from 'react'
import '../table.css'
import { Link } from 'react-router-dom'

import { MinifiedReceivedOrder } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type ReceivedOrdersProps = {
  data: Array<MinifiedReceivedOrder>
  page: number
  setPage: (page: number) => void
  pages: number
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
  totalElements: number
}

const columns = [
  { name: 'Order ID', uid: 'id' },
  { name: 'Billing Name', uid: 'name' },
  { name: 'Date', uid: 'date' },
  { name: 'Total', uid: 'total' },
  { name: 'Order Status', uid: 'status' },
  { name: 'Payment Method', uid: 'payment' },
  { name: 'ACTIONS', uid: 'actions' },
]

export const ReceivedOrders: FC<ReceivedOrdersProps> = ({
  data,
  pages,
  page,
  setPage,
  setRowsPerPage,
  totalElements,
  rowsPerPage,
}) => {
  const renderCell = useCallback(
    (
      { orderId, name, orderDate, orderTotal, orderStatus, modeOfPayment }: MinifiedReceivedOrder,
      columnKey: Key
    ) => {
      switch (columnKey) {
        case 'id':
          return (
            <div className="flex flex-col">
              <b>
                <p className="text-bold text-sm capitalize">{orderId.substring(0, 7)}</p>
              </b>
            </div>
          )
        case 'name':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{name}</p>
            </div>
          )
        case 'date':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {moment(orderDate).format('DD-MM-YYYY')}
              </p>
            </div>
          )
        case 'total':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{`${INR_CURRENCY_SYMBOL} ${round(orderTotal, 2)}`}</p>
            </div>
          )
        case 'status':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{orderStatus}</p>
            </div>
          )
        case 'payment':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {startCase(modeOfPayment.replace('_', ' '))}
              </p>
            </div>
          )
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="View Order">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Link to={`/admin/order/${orderId}`}>
                    <EyeIcon />
                  </Link>
                </span>
              </Tooltip>
            </div>
          )
        default:
          return name
      }
    },
    []
  )

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {totalElements} orders</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [onRowsPerPageChange, data.length])

  return (
    <Table
      aria-label="All Orders"
      topContent={topContent}
      bottomContentPlacement="outside"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: 'max-h-[682px] py-4',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.orderId} style={{ height: '60px' }}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
