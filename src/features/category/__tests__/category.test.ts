import { aCategoryFactory } from '@/factories/category'

describe('categories', () => {
  test('verify categories', () => {
    const categories = Array.from({ length: 3 }, aCategoryFactory)

    console.info(JSON.stringify(categories, null, 2))
    expect(categories).toHaveLength(3)
  })
})
