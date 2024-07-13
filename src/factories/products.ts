import { faker } from '@faker-js/faker'

import { AddProductInput, ProductCategory } from '@/types'

const categories = [ProductCategory.Category1, ProductCategory.Category2, ProductCategory.Category3]

function getRandomCategories(): ProductCategory[] {
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
  categories: getRandomCategories(),
  __typename: 'AddProductInput',
}))
