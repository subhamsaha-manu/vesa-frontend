import { aProductFactory } from '@/factories/products'

describe('products', () => {
  test('verify products', () => {
    const products = Array.from({ length: 22 }, aProductFactory)

    console.info(JSON.stringify(products, null, 2))
    expect(products).toHaveLength(22)
  })
})