import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'

import { Choice, Question } from '@/types'

const choiceMock = Factory.Sync.makeFactory<Choice>({
  uuid: Factory.each(() => faker.datatype.uuid()),
  title: Factory.each(() => faker.random.words(4)),
  isCorrect: false,
  __typename: 'Choice',
})

export const questionMock = Factory.Sync.makeFactory<Question>({
  uuid: Factory.each(() => faker.datatype.uuid()),
  title: Factory.each(() => faker.random.words(10)),
  choices: [
    choiceMock.build(),
    choiceMock.build(),
    choiceMock.build(),
    choiceMock.build({
      isCorrect: true,
    }),
  ],
  weight: 10,
  __typename: 'Question',
})
