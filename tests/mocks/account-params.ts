import { faker } from '@faker-js/faker'

export const accountParams = {
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  hashPassword: faker.string.uuid(),
  error: new Error(faker.lorem.word())
}
