import { aCategoryFactory } from '@/factories/category'

describe('categories', () => {
  test('verify categories', () => {
    const categories = Array.from({ length: 4 }, aCategoryFactory)

    //console.info(JSON.stringify(categories, null, 2))

    expect(categories).toHaveLength(4)
  })
})
