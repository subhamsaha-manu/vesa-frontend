import { EditIcon } from '@chakra-ui/icons'
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
import { Link } from 'react-router-dom'

import { Category } from '@/types'

type ProductsProps = {
  data: Array<Category>
}

const columns = [
  { name: 'CATEGORY', uid: 'name' },
  { name: 'ACTIONS', uid: 'actions' },
]

export const Categories: FC<ProductsProps> = ({ data }) => {
  const renderCell = useCallback(({ categoryId, name, imageUrl }: Category, columnKey: Key) => {
    switch (columnKey) {
      case 'name':
        return (
          <User avatarProps={{ radius: 'sm', src: imageUrl, size: 'lg' }} name={name}>
            {name}
          </User>
        )
      case 'actions':
        return (
          <div>
            <Tooltip content="Edit Category">
              <span>
                <Link to={`/admin/category/${categoryId}`}>
                  <EditIcon />
                </Link>
              </span>
            </Tooltip>
          </div>
        )
      default:
        return name
    }
  }, [])

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
