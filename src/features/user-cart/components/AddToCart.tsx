import { Flex } from '@chakra-ui/react'
import { ShoppingCartCheckIn01Icon } from 'hugeicons-react'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAddProductToCartMutation } from '../apis/addProductToCart.generated'
import { userCart } from '../apis/userCart'

import { Button } from '@/components/ui/button'
import { TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

type AddToCartProps = {
  productId: string
  mobileView?: boolean
}

export const AddToCart: FC<AddToCartProps> = ({ productId, mobileView }) => {
  const authToken = storage.getItem(TOKEN)

  const [addedToCart, setAddedToCart] = useState<boolean>(false)

  const navigate = useNavigate()

  const [addToCart, { loading }] = useAddProductToCartMutation({
    variables: {
      productId,
    },
    refetchQueries: [{ query: userCart }],
    onCompleted: () => {
      setAddedToCart(true)
    },
  })

  return (
    <Flex display-name="add-to-cart-button-wrapper" style={{ width: 'calc(100%-148px)' }} flex={1}>
      {addedToCart ? (
        <Button
          variant="solid"
          size={mobileView ? 'sm' : 'lg'}
          color="white"
          background="black"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="40px"
          onClick={() => navigate('/cart')}
          width="100%"
        >
          View Cart
        </Button>
      ) : (
        <Button
          variant="solid"
          size={mobileView ? 'sm' : 'lg'}
          color="white"
          background="black"
          loading={loading}
          loadingText="Adding to Cart"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="40px"
          onClick={() => {
            if (authToken) {
              void addToCart()
            } else {
              navigate('/auth')
            }
          }}
          disabled={loading}
          width="100%"
        >
          <ShoppingCartCheckIn01Icon size={mobileView ? 18 : 22} /> Add to Cart
        </Button>
      )}
    </Flex>
  )
}
