import React, { FC } from 'react'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Flex, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useUserWishlistQuery } from '../apis/userWishlist.generated'
import { WishlistContent } from './WishlistContent'
import { EmptyWishlist } from './EmptyWishlist'
import { ContentLayout } from '@/components/Layout'

const UserWishlist: FC = () => {
  const navigate = useNavigate()

  const { data, loading, refetch } = useUserWishlistQuery({
    variables: {
      userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
    },
    fetchPolicy: 'network-only',
  })

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <ContentLayout pageTitle="Wishlist">
      <Flex display-name="main-wishlist-section" w="100%" gap={6} pt="30px" flexDir="column">
        <Flex display-name="heading-flex" w="100%" align="center" gap={6}>
          <Flex display-name="heading-flex" align="center">
            <Heading fontSize="xl">MY WISHLIST</Heading>
          </Flex>
        </Flex>
        {data.userWishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <WishlistContent wishlistItems={data.userWishlist} refetchWishlist={refetch} />
        )}
      </Flex>
    </ContentLayout>
  )
}

export default UserWishlist
