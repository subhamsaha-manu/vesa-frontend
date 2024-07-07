import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'

import { Challenge, ChallengeStatus, ChallengeType } from '@/types'

const visibleChallengeStatuses = [
  ChallengeStatus.Completed,
  ChallengeStatus.Pending,
  ChallengeStatus.Cancelled,
]

const challengeStatuses = Object.keys(visibleChallengeStatuses).map(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (k) => visibleChallengeStatuses[k]
)

export const receivedChallengeMock = Factory.Sync.makeFactory<Challenge>({
  uuid: Factory.each(() => faker.datatype.uuid()),
  title: Factory.each(() => faker.random.word()),
  userUuid: Factory.each(() => faker.datatype.uuid()),
  questionIds: ['question-1'],
  type: ChallengeType.Received,
  status: Factory.each(() => faker.helpers.arrayElement(challengeStatuses)),
  __typename: 'Challenge',
})

export const sentChallengeMock = Factory.Sync.makeFactory<Challenge>({
  uuid: Factory.each(() => faker.datatype.uuid()),
  title: Factory.each(() => faker.random.word()),
  userUuid: Factory.each(() => faker.datatype.uuid()),
  questionIds: ['question-1'],
  type: ChallengeType.Sent,
  status: ChallengeStatus.Pending,
  __typename: 'Challenge',
})
