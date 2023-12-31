import { faker } from '@faker-js/faker'

export const tasksParams = {
  id: faker.string.uuid(),
  title: faker.lorem.words(5),
  description: faker.lorem.word(),
  completed: faker.datatype.boolean(),
  error: new Error(faker.lorem.word())
}
