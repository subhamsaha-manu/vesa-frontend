import { faker } from '@faker-js/faker'

import { AddCategoryInput } from '@/types'

export const aCategoryFactory = makeFactory<AddCategoryInput>(() => ({
  name: faker.commerce.department(),
  description: faker.commerce.productDescription(),
  imageUrl: faker.image.url(),
}))

function makeFactory<T>(template: () => T): () => T {
  return template
}
