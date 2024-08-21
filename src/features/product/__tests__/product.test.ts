import { aProductFactory } from '@/factories/products'

describe('products', () => {
  test('verify products', () => {
    const products = Array.from({ length: 40 }, aProductFactory)

    //console.info(JSON.stringify(products, null, 2))
    expect(products).toHaveLength(40)
  })
})
