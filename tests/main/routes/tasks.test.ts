import configuration from '@/main/config/env'
import { tasksParams, resetDataBase } from '@/tests/mocks'
import { RoutesModule } from '@/main/routes/routes.module'

import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { ValidationPipe, type INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

describe('Account Route', () => {
  let app: INestApplication

  const { title } = tasksParams

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
        .send({ title })

      expect(status).toBe(400)
      expect(body.message[0]).toEqual('description should not be empty')
    })
  })
})
