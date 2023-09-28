import { faker } from '@faker-js/faker'

export const tasksParams = {
  id: faker.string.uuid(),
  title: faker.lorem.word(),
  description: faker.lorem.word(),
  completed: faker.datatype.boolean(),
  error: new Error(faker.lorem.word())
}
