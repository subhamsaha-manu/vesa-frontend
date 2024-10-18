import { FC } from 'react'
import { MinifiedProduct } from '@/types'
import { Flex } from '@chakra-ui/react'
import { MobileViewCard } from './MobileViewCard'

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
            wishlistItem={wishlistItem}
            onItemClick={onItemClick}
            onRemoveClick={onRemoveClick}
          />
        ))}
      </Flex>
    </Flex>
  )
}
