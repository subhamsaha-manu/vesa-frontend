import { EditIcon } from '@chakra-ui/icons'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from '@nextui-org/react'
import round from 'lodash/round'
import { FC, Key, useCallback } from 'react'
import '../table.css'
import { Link } from 'react-router-dom'

import { MinifiedProduct } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type MinifiedProductType = Pick<
  MinifiedProduct,
  'productId' | 'title' | 'price' | 'quantity' | 'thumbnailUrl' | 'status'
>

type ProductsProps = {
  data: Array<MinifiedProductType>
  page: number
  setPage: (page: number) => void
  pages: number
}

const columns = [
  { name: 'PRODUCT', uid: 'name' },
  { name: 'QTY', uid: 'quantity' },
  { name: 'PRICE', uid: 'price' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
]

export const Products: FC<ProductsProps> = ({ data, pages, page, setPage }) => {
  const renderCell = useCallback(
    (
      { price, productId, quantity, thumbnailUrl, title, status }: MinifiedProductType,
      columnKey: Key
    ) => {
      switch (columnKey) {
        case 'name':
          return (
            <User avatarProps={{ radius: 'lg', src: thumbnailUrl }} name={title}>
              {title}
            </User>
          )
        case 'quantity':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{quantity}</p>
            </div>
          )
        case 'price':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{`${INR_CURRENCY_SYMBOL} ${round(price, 2)}`}</p>
            </div>
          )
        case 'status':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{status}</p>
            </div>
          )
        case 'actions':
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Edit Product">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Link to={`/admin/product/${productId}`}>
                    <EditIcon />
                  </Link>
                </span>
              </Tooltip>
            </div>
          )
        default:
          return title
      }
    },
    []
  )

  return (
    <Table
      aria-label="All Products"
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
        wrapper: 'min-h-[222px] py-4',
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
          <TableRow key={item.productId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
