import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

import { AddCategoryInput } from '@/types'

export const aCategoryFactory = makeFactory<AddCategoryInput>(() => ({
  categoryId: uuidv4(),
  name: faker.commerce.department(),
  description: faker.commerce.productDescription(),
  imageUrlType: faker.image.url(),
}))

function makeFactory<T>(template: () => T): () => T {
  return template
}
