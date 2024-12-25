import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from '@nextui-org/react'
import { FC, Key, useCallback } from 'react'
import '../table.css'
import { CiEdit } from 'react-icons/ci'
import { Link } from 'react-router-dom'

import { Category } from '@/types'

type ProductsProps = {
  data: Array<Category>
}

const columns = [
  { name: 'CATEGORY', uid: 'name' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
]

export const Categories: FC<ProductsProps> = ({ data }) => {
  const renderCell = useCallback(
    ({ categoryId, name, imageUrl, status }: Category, columnKey: Key) => {
      switch (columnKey) {
        case 'name':
          return (
            <User avatarProps={{ radius: 'sm', src: imageUrl, size: 'lg' }} name={name}>
              {name}
            </User>
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
              <Tooltip content="Edit Category">
                <span>
                  <Link to={`/admin/category/${categoryId}`}>
                    <CiEdit />
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

  return (
    <Table
      aria-label="All Categories"
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
          <TableRow key={item.categoryId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
