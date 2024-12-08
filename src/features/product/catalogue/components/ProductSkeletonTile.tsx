import { Skeleton } from '@nextui-org/react'
import { FC } from 'react'

export const ProductSkeletonTile: FC = () => {
  return (
    <Skeleton style={{ height: '350px', width: '100%', borderRadius: '8px', marginTop: '12px' }} />
  )
}
