import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

import { AddCategoryInput, CategoryStatus } from '@/types'

export const aCategoryFactory = makeFactory<AddCategoryInput>(() => ({
  categoryId: uuidv4(),
  name: faker.commerce.department(),
  description: faker.commerce.productDescription(),
  imageUrlType: faker.image.url(),
  status: CategoryStatus.Published,
}))

function makeFactory<T>(template: () => T): () => T {
  return template
}
