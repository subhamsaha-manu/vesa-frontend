import { aCategoryFactory } from '@/factories/category'

describe('categories', () => {
  test('verify categories', () => {
    const categories = Array.from({ length: 3 }, aCategoryFactory)

    expect(categories).toHaveLength(3)
  })
})
