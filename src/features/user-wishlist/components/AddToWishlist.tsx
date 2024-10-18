import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { FavouriteIcon, HeartAddIcon } from 'hugeicons-react'
import useUserWishlistCartContextProvider from '@/context/UserWishlistCartContextProvider'
import { useAddProductToWishlistMutation } from '../apis/addProductToWishlist.generated'
import { Text } from '@chakra-ui/layout'
import { userWishlist } from '../apis/userWishlist'
import { SpinnerContainer } from '@/components/elements/Spinner'
import noop from 'lodash/noop'
import { useNavigate } from 'react-router-dom'
import { storage } from '@/utils/storage'
import { TOKEN } from '@/utils/constants'

type AddToWishlistProps = {
  productId: string
  mobileView?: boolean
}
export const AddToWishlist: FC<AddToWishlistProps> = ({ productId, mobileView }) => {
  const authToken = storage.getItem(TOKEN)

  const { wishlistItems } = useUserWishlistCartContextProvider()

  const navigate = useNavigate()

  const [addToWishlist, { loading }] = useAddProductToWishlistMutation({
    variables: {
      productId,
    },
    refetchQueries: [{ query: userWishlist }],
  })

  const isProductInWishlist = wishlistItems.some((item) => item === productId)

  const labelText = isProductInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'
  return (
    <Flex
      display-name="add-to-wishlist-button-wrapper"
      gap={{ base: 1, xl: 3 }}
      _hover={{ color: '#D9121F', cursor: isProductInWishlist ? 'default' : 'pointer' }}
      opacity={1}
      onClick={() => {
        if (authToken) {
          isProductInWishlist ? noop() : addToWishlist()
        } else {
          navigate('/auth')
        }
      }}
      align="center"
      flex={1}
    >
      {loading ? (
        <SpinnerContainer size="20px" overflow="unset" width="5%" />
      ) : (
        <>
          {isProductInWishlist ? (
            <FavouriteIcon fill="red" size={mobileView ? 18 : 22} color="red" />
          ) : (
            <HeartAddIcon fill="transparent" color="red" size={mobileView ? 18 : 22} />
          )}
        </>
      )}
      <Text fontSize={mobileView ? 'sm' : 'md'} color={isProductInWishlist ? 'red' : 'black'}>
        {labelText}
      </Text>
    </Flex>
  )
}
