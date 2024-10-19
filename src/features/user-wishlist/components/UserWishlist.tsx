import { Flex, Heading } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { EmptyWishlist } from './EmptyWishlist'
import { WishlistContent } from './WishlistContent'
import { WishlistMobileView } from './WishlistMobileView'

import { useRemoveProductFromWishlistMutation } from '../apis/removeProductFromWishlist.generated'
import { userWishlist } from '../apis/userWishlist'
import { useUserWishlistQuery } from '../apis/userWishlist.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout'
import { useWindowSize } from '@/hooks/useWindowSize'

const UserWishlist: FC = () => {
  const navigate = useNavigate()

  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  const { data, loading } = useUserWishlistQuery({
    fetchPolicy: 'network-only',
  })

  const [removeProductFromWishlist] = useRemoveProductFromWishlistMutation({
    refetchQueries: [{ query: userWishlist }],
  })

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <ContentLayout pageTitle="Wishlist">
      <Flex
        display-name="main-wishlist-section"
        w="100%"
        gap={6}
        pt={{ base: '10px', xl: '30px' }}
        flexDir="column"
      >
        <Flex display-name="heading-flex" w="100%" align="center" gap={6}>
          <Flex display-name="heading-flex" align="center">
            <Heading fontSize={{ base: 'md', xl: 'xl' }}>MY WISHLIST</Heading>
          </Flex>
        </Flex>
        {data.userWishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            {isMobile ? (
              <WishlistMobileView
                wishlistItems={data.userWishlist}
                onRemoveClick={(productId) => {
                  void removeProductFromWishlist({
                    variables: {
                      productId,
                    },
                  })
                }}
                onItemClick={(productId) => navigate(`/product/${productId}`)}
              />
            ) : (
              <WishlistContent
                wishlistItems={data.userWishlist}
                onRemoveClick={(productId) => {
                  void removeProductFromWishlist({
                    variables: {
                      productId,
                    },
                  })
                }}
                onItemClick={(productId) => navigate(`/product/${productId}`)}
              />
            )}
          </>
        )}
      </Flex>
    </ContentLayout>
  )
}

export default UserWishlist
