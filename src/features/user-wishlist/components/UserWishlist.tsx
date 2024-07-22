import React, { FC } from 'react'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useUserWishlistQuery } from '../apis/userWishlist.generated'
import { WishlistContent } from './WishlistContent'
import { EmptyWishlist } from './EmptyWishlist'

export const UserWishlist: FC = () => {
  const navigate = useNavigate()

  const { data, loading, refetch } = useUserWishlistQuery({
    variables: {
      userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
    },
    fetchPolicy: 'network-only',
  })

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <Flex display-name="user-wishlist-flex" flexDir="column" w="100%" maxW="1310px">
      <Flex display-name="breadcrumb-layout-heading-flex-user-wishlist" w="100%" p="5px 0" gap={2}>
        <Text
          fontSize="md"
          color="gray"
          _hover={{ cursor: 'pointer', 'text-decoration': 'underline' }}
          onClick={() => navigate('/')}
        >
          Home
        </Text>
        <Text fontSize="md" color="gray">
          {`>`}
        </Text>
        <Text fontSize="md" as="b" color="gray">
          Wishlist
        </Text>
      </Flex>
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
    </Flex>
  )
}
