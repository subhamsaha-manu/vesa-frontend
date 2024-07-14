import { faker } from '@faker-js/faker'

import { AddProductInput } from '@/types'

const categories = [
  '6e3a139d-24ac-4a0e-bf66-3af46ea97c53',
  '60cffe75-6f74-4145-856d-054fa81c908e',
  '3298e0f0-89b1-439e-8b7a-c58686e6644d',
  'ff4e6fb9-9a12-4719-92e2-14d373344eb2',
]

function getRandomCategoryIds(): Array<string> {
  const numberOfCategories = faker.number.int({ min: 1, max: 3 })
  const shuffled = faker.helpers.shuffle(categories)
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
  __typename: 'AddProductInput',
}))
