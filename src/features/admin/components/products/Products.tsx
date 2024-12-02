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
            <User avatarProps={{ radius: 'sm', src: thumbnailUrl, size: 'lg' }} name={title}>
              {title}
            </User>
          )
        case 'quantity':
          return (
            <div>
              <p>{quantity}</p>
            </div>
          )
        case 'price':
          return (
            <div>
              <p>{`${INR_CURRENCY_SYMBOL} ${round(price, 2)}`}</p>
            </div>
          )
        case 'status':
          return (
            <div>
              <p>{status}</p>
            </div>
          )
        case 'actions':
          return (
            <div>
              <Tooltip content="Edit Product">
                <span>
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
      <TableBody items={data} emptyContent="No products found">
        {(item) => (
          <TableRow key={item.productId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
