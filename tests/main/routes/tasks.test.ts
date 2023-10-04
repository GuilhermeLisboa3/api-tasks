import configuration from '@/main/config/env'
import { tasksParams, resetDataBase, accountParams } from '@/tests/mocks'
import { RoutesModule } from '@/main/routes/routes.module'
import prisma from '@/infra/database/postgres/helpers/connection'

import * as request from 'supertest'
import * as jwt from 'jsonwebtoken'
import { Test } from '@nestjs/testing'
import { ValidationPipe, type INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppModule } from '@/main/app.module'

describe('Account Route', () => {
  let app: INestApplication
  let token: string
  const { title, description, completed } = tasksParams
  const { id, name, email, password } = accountParams
  const { secret } = configuration()

  beforeAll(async () => {
    token = jwt.sign({ key: id }, secret)
  })

  beforeEach(async () => {
    await resetDataBase()
    await prisma.user.create({ data: { id, name, email, password } })
  })

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
        }),
        AppModule,
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
      const { status } = await request(app.getHttpServer())
        .post('/add-tasks')
        .set({ authorization: `Bearer: ${token}` })
        .send({ title })

      expect(status).toBe(400)
    })

    it('should return 204 on success', async () => {
      const { status } = await request(app.getHttpServer())
        .post('/add-tasks')
        .set({ authorization: `Bearer: ${token}` })
        .send({ title, description })
      expect(status).toBe(204)
    })
  })

  describe('/PUT update-tasks', () => {
    it('should return 204 on success', async () => {
      await prisma.task.create({ data: { id, title, description, userId: id, completed } })
      const { status } = await request(app.getHttpServer())
        .put('/update-task')
        .set({ authorization: `Bearer: ${token}` })
        .send({ id, title, description })
      expect(status).toBe(204)
    })
  })
})
