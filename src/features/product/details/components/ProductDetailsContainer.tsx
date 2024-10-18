import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useProductQuery } from '../apis/product.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { useWindowSize } from '@/hooks/useWindowSize'
import { ProductDetailsMobileView } from './ProductDetailsMobileView'
import { ProductDetailsDesktopView } from './ProductDetailsDesktopView'

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

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <>
      {isMobile ? (
        <ProductDetailsMobileView productDetail={data.product} />
      ) : (
        <ProductDetailsDesktopView productDetail={data.product} />
      )}
    </>
  )
}
