import { Product } from '@/types'

export type ProductViewProps = {
  productDetail?: Omit<Product, 'id' | 'categoryIds' | 'status'>
  loading: boolean
}
