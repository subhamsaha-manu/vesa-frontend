import { aProductFactory } from '@/factories/products'

describe('products', () => {
  test('verify products', () => {
    const products = Array.from({ length: 22 }, aProductFactory)

    expect(products).toHaveLength(22)
  })
})
