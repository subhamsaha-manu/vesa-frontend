import { Flex, Text } from '@chakra-ui/react'
import { FavouriteIcon, HeartAddIcon } from 'hugeicons-react'
import noop from 'lodash/noop'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAddProductToWishlistMutation } from '../apis/addProductToWishlist.generated'
import { userWishlist } from '../apis/userWishlist'

import { SpinnerContainer } from '@/components/elements/Spinner'
import useUserWishlistCartContextProvider from '@/context/UserWishlistCartContextProvider'
import { TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

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
        <SpinnerContainer overflow="unset" width="5%" />
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
