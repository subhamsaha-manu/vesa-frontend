import { Flex } from '@chakra-ui/react'
import { ShoppingCartCheckIn01Icon } from 'hugeicons-react'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAddProductToCartMutation } from '../apis/addProductToCart.generated'
import { userCart } from '../apis/userCart'

import { SpinnerContainer } from '@/components/elements/Spinner'
import VesaButton from '@/components/elements/VesaButton'
import { TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

type AddToCartProps = {
  productId: string
  mobileView: boolean
  isDisabled?: boolean
  roundedButton?: boolean
}

export const AddToCart: FC<AddToCartProps> = ({
  productId,
  mobileView,
  isDisabled = false,
  roundedButton = true,
}) => {
  const authToken = storage.getItem(TOKEN)

  const [addedToCart, setAddedToCart] = useState<boolean>(false)

  const navigate = useNavigate()

  const [addToCart, { loading }] = useAddProductToCartMutation({
    variables: {
      productId,
    },
    refetchQueries: [{ query: userCart }],
    onCompleted: (data) => {
      if (data.addProductToCart) {
        setAddedToCart(true)
      }
    },
  })

  return (
    <Flex display-name="add-to-cart-button-wrapper" style={{ width: 'calc(100%-148px)' }} flex={1}>
      {addedToCart ? (
        <VesaButton
          label="View Cart"
          loading={false}
          primaryIcon={<></>}
          secondaryIcon={<></>}
          onClick={() => navigate('/cart')}
          isDisabled={false}
          mobileView={mobileView}
          rounded={roundedButton}
        />
      ) : (
        <VesaButton
          label="Add to Cart"
          loading={loading}
          primaryIcon={<ShoppingCartCheckIn01Icon size={mobileView ? 18 : 22} />}
          secondaryIcon={<SpinnerContainer size={mobileView ? '5px' : '20px'} overflow="unset" />}
          onClick={() => {
            if (authToken) {
              void addToCart()
            } else {
              navigate('/auth')
            }
          }}
          isDisabled={isDisabled}
          mobileView={mobileView}
          rounded={roundedButton}
        />
      )}
    </Flex>
  )
}
