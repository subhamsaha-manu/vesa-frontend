import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'

import { User } from '@/types'

export const currentUserMock = Factory.Sync.makeFactory<User>({
  uuid: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  mobileNumber: faker.phone.number(),
  isLoggedIn: true,
  stars: 5,
  score: 10,
  roles: ['ADMIN', 'USER'],
  __typename: 'User',
})
