import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { ProductDetailsDesktopView } from './ProductDetailsDesktopView'

import { useProductQuery } from '../apis/product.generated'

import { useWindowSize } from '@/hooks/useWindowSize'

type ProductParamType = {
  productId: string
}

export const ProductDetailsContainer: FC = () => {
  const { productId } = useParams<keyof ProductParamType>() as ProductParamType

  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  const { data, loading } = useProductQuery({
    variables: {
      productId,
    },
    fetchPolicy: 'network-only',
  })

  // if (loading || !data) {
  //   return <SpinnerContainer height="60vh" />
  // }

  return (
    <>
      {isMobile ? (
        // <ProductDetailsMobileView productDetail={data?.product} />
        <div>div</div>
      ) : (
        <ProductDetailsDesktopView productDetail={data?.product} loading={loading} />
      )}
    </>
  )
}
