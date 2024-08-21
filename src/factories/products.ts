import { faker } from '@faker-js/faker'

import { AddProductInput } from '@/types'

const categoryIds = [
  'a73047b6-a146-4ff1-8435-2a2b66a06ecd',
  '8848777f-481c-4127-aba7-6d4beaa80886',
  'e00eaa5d-95f3-469b-ac73-c66af8e88a00',
  'ca91d2c6-2efa-4ca3-9aea-843b5cb9b132',
]

function getRandomCategoryIds(): Array<string> {
  const numberOfCategories = faker.number.int({ min: 1, max: 3 })
  const shuffled = faker.helpers.shuffle(categoryIds)
  return shuffled.slice(0, numberOfCategories)
}

function makeFactory<T>(template: () => T): () => T {
  return template
}

export const aProductFactory = makeFactory<AddProductInput>(() => ({
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  imageUrl: faker.image.url(),
  thumbnailUrl: faker.image.url(),
  categoryIds: getRandomCategoryIds(),
}))
