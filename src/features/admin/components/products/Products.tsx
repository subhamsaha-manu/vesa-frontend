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
import { ChangeEvent, FC, Key, useCallback, useMemo } from 'react'
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
  totalElements: number
  page: number
  setPage: (page: number) => void
  pages: number
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
}

const columns = [
  { name: 'PRODUCT', uid: 'name' },
  { name: 'QTY', uid: 'quantity' },
  { name: 'PRICE', uid: 'price' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
]

export const Products: FC<ProductsProps> = ({
  data,
  totalElements,
  pages,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

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

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {totalElements} products</span>
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
      aria-label="All Products"
      isHeaderSticky
      bottomContentPlacement="outside"
      topContentPlacement="outside"
      topContent={topContent}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
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
