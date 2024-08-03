import React, { FC } from 'react'
import { Flex, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { MultiplicationSignIcon } from 'hugeicons-react'
import { useNavigate } from 'react-router-dom'
import { MinifiedProduct } from '@/types'
import { useRemoveProductFromWishlistMutation } from '../apis/removeProductFromWishlist.generated'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'

type WishlistContentProps = {
  wishlistItems: Array<Omit<MinifiedProduct, 'thumbnailUrl' | 'id'>>
  refetchWishlist: () => void
}
export const WishlistContent: FC<WishlistContentProps> = ({ wishlistItems, refetchWishlist }) => {
  const navigate = useNavigate()

  const {
    currentUser: { userId },
  } = useCurrentUserContext()
  
  const [removeProductFromWishlist] = useRemoveProductFromWishlistMutation({
    onCompleted: () => {
      refetchWishlist()
    },
  })

  return (
    <Flex display-name="main-content" w="100%" h="100%" gap={6} justify="space-between">
      <Flex display-name="wishlist-items-table" w="100%" h="100%">
        <TableContainer w="100%">
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }}>Product name</Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }}>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {wishlistItems.map(({ imageUrl, price, productId, title }) => (
                <Tr key={productId}>
                  <Td
                    _hover={{ color: '#D9121F', cursor: 'pointer' }}
                    onClick={() => {
                      void removeProductFromWishlist({
                        variables: {
                          userId,
                          productId,
                        },
                      })
                    }}
                  >
                    <MultiplicationSignIcon size={15} />
                  </Td>
                  <Td>
                    <Image src={imageUrl} alt={title} h="100px" w="80px" />
                  </Td>
                  <Td
                    style={{ fontWeight: '400' }}
                    _hover={{ cursor: 'pointer', color: '#00bb00', textDecoration: 'underline' }}
                    onClick={() => navigate(`/product/${productId}`)}
                  >
                    {title}
                  </Td>
                  <Td>{price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  )
}
