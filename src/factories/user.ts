import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'

import { User } from '@/types'

export const currentUserMock = Factory.Sync.makeFactory<User>({
  uuid: faker.datatype.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  mobileNumber: faker.phone.phoneNumber(),
  isLoggedIn: true,
  stars: 5,
  score: 10,
  roles: ['ADMIN', 'USER'],
  __typename: 'User',
})
