import { faker } from '@faker-js/faker'

export const accountParams = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  hashPassword: faker.string.uuid(),
  accessToken: faker.string.uuid(),
  error: new Error(faker.lorem.word())
}
