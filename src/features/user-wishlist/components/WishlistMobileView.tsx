import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

import { MobileViewCard } from './MobileViewCard'

import { MinifiedProduct } from '@/types'

type WishlistMobileViewProps = {
  wishlistItems: Array<Omit<MinifiedProduct, 'thumbnailUrl' | 'id'>>
  onItemClick: (productId: string) => void
  onRemoveClick: (productId: string) => void
}
export const WishlistMobileView: FC<WishlistMobileViewProps> = ({
  wishlistItems,
  onItemClick,
  onRemoveClick,
}) => {
  return (
    <Flex display-name="mobile-view-main-content" w="100%" h="auto" flexDir="column" gap={10}>
      <Flex display-name="products-container" flexWrap="wrap" justifyContent="space-between">
        {wishlistItems.map((wishlistItem) => (
          <MobileViewCard
            key={wishlistItem.productId}
            wishlistItem={wishlistItem}
            onItemClick={onItemClick}
            onRemoveClick={onRemoveClick}
          />
        ))}
      </Flex>
    </Flex>
  )
}
