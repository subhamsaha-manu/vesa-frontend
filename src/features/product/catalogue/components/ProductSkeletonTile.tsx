import { Skeleton } from '@heroui/react'
import { FC } from 'react'

export const ProductSkeletonTile: FC = () => {
  return (
    <Skeleton style={{ height: '484px', width: '100%', borderRadius: '8px', marginTop: '24px' }} />
  )
}
