import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { HeartAddIcon } from 'hugeicons-react'
import { Text } from '@chakra-ui/layout'

type AddToWishlistProps = {
  productId: string
}
export const AddToWishlist: FC<AddToWishlistProps> = () => {
  return (
    <Flex
      display-name="add-to-wishlist-button-wrapper"
      gap={2}
      _hover={{ color: '#D9121F', cursor: 'pointer' }}
    >
      <HeartAddIcon />
      <Text>Add to Wishlist</Text>
    </Flex>
  )
}
