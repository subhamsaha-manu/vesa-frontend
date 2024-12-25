import { Flex, Image, Table } from '@chakra-ui/react'
import { MultiplicationSignIcon } from 'hugeicons-react'
import { FC } from 'react'

import { MinifiedProduct } from '@/types'

type WishlistContentProps = {
  wishlistItems: Array<Omit<MinifiedProduct, 'status' | 'id'>>
  onRemoveClick: (productId: string) => void
  onItemClick: (productId: string) => void
}
export const WishlistContent: FC<WishlistContentProps> = ({
  wishlistItems,
  onItemClick,
  onRemoveClick,
}) => {
  return (
    <Flex display-name="main-content" w="100%" h="100%" gap={6} justify="space-between">
      <Flex display-name="wishlist-items-table" w="100%" h="100%">
        <Table.Root variant="outline" size="lg" w="100%">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader />
              <Table.ColumnHeader />
              <Table.ColumnHeader style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                Product name
              </Table.ColumnHeader>
              <Table.ColumnHeader style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                Price
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {wishlistItems.map(({ imageUrls, price, productId, title }) => (
              <Table.Row key={productId}>
                <Table.Cell
                  _hover={{ color: '#D9121F', cursor: 'pointer' }}
                  onClick={() => onRemoveClick(productId)}
                >
                  <MultiplicationSignIcon size={15} />
                </Table.Cell>
                <Table.Cell>
                  <Image src={imageUrls[0]} alt={title} h="100px" w="80px" />
                </Table.Cell>
                <Table.Cell
                  style={{ fontWeight: '400' }}
                  _hover={{ cursor: 'pointer', color: '#00bb00', textDecoration: 'underline' }}
                  onClick={() => onItemClick(productId)}
                >
                  {title}
                </Table.Cell>
                <Table.Cell>{price}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </Flex>
  )
}
