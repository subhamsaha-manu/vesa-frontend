import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { HeartAddIcon } from 'hugeicons-react'
import useUserCartContextProvider from '@/context/UserCartContextProvider'
import { useAddProductToWishlistMutation } from '../apis/addProductToWishlist.generated'
import { Text } from '@chakra-ui/layout'
import { userWishlist } from '../apis/userWishlist'
import { SpinnerContainer } from '@/components/elements/Spinner'

type AddToWishlistProps = {
  productId: string
}
export const AddToWishlist: FC<AddToWishlistProps> = ({ productId }) => {
  const { wishlistItems } = useUserCartContextProvider()

  const [addToWishlist, { loading }] = useAddProductToWishlistMutation({
    variables: {
      userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
      productId,
    },
    refetchQueries: [
      { query: userWishlist, variables: { userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e' } },
    ],
  })

  const isProductInWishlist = wishlistItems.some((item) => item === productId)

  return (
    <Flex
      display-name="add-to-wishlist-button-wrapper"
      gap={3}
      _hover={{ color: '#D9121F', cursor: isProductInWishlist ? 'not-allowed' : 'pointer' }}
      opacity={isProductInWishlist ? 0.5 : 1}
      onClick={() => addToWishlist()}
      align="center"
    >
      {loading ? (
        <SpinnerContainer size="20px" overflow="unset" width="5%" />
      ) : (
        <HeartAddIcon fill={isProductInWishlist ? 'red' : 'transparent'} />
      )}
      <Text>Add to Wishlist</Text>
    </Flex>
  )
}
