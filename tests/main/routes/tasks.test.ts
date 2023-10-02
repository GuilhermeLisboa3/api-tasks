import configuration from '@/main/config/env'
import { tasksParams, resetDataBase } from '@/tests/mocks'
import { RoutesModule } from '@/main/routes/routes.module'
import { NotFoundError } from '@/domain/errors'
import { AuthenticationMiddlewareModule } from '@/main/factories/application/middlewares'

import * as request from 'supertest'
import { faker } from '@faker-js/faker'
import { Test } from '@nestjs/testing'
import { ValidationPipe, type INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

describe('Account Route', () => {
  let app: INestApplication
  const invalidToken = faker.string.uuid()
  const { title, description } = tasksParams

  beforeEach(async () => {
    await resetDataBase()
  })

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
        }),
        AuthenticationMiddlewareModule,
        RoutesModule
      ]
    })
      .compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/POST add-tasks', () => {
    it('should return 400 if has invalid data', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/add-tasks')
        .set({ authorization: `Bearer: ${invalidToken}` })
        .send({ title })

      expect(status).toBe(400)
      expect(body.message[0]).toEqual('description should not be empty')
    })

    it('should return 404 if accountId is not valid', async () => {
      const { status, body: { error } } = await request(app.getHttpServer())
        .post('/add-tasks')
        .set({ authorization: `Bearer: ${invalidToken}` })
        .send({ title, description })

      expect(status).toBe(404)
      expect(error).toEqual(new NotFoundError('accountId').message)
    })
  })
})
