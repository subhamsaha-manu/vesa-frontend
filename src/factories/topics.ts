import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'

import { DifficultyLevel, MainTopic, Subtopic, TopicType } from '@/types'

export const mainTopicMock = Factory.Sync.makeFactory<MainTopic>({
  uuid: Factory.each(() => faker.datatype.uuid()),
  name: Factory.each(() => faker.random.word()),
  description: Factory.each(() => faker.random.words(3)),
  type: TopicType.MainTopic,
  __typename: 'MainTopic',
})

export const subtopicMock = Factory.Sync.makeFactory<Subtopic>({
  uuid: Factory.each(() => faker.datatype.uuid()),
  name: Factory.each(() => faker.random.word()),
  topicId: 'topic-1',
  difficulty: DifficultyLevel.Easy,
  type: TopicType.SubTopic,
  description: faker.random.words(5),
  __typename: 'Subtopic',
})
