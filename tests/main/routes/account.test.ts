import configuration from '@/main/config/env'
import { accountParams, resetDataBase } from '@/tests/mocks'
import { RoutesModule } from '@/main/routes/routes.module'
import { FieldInUseError } from '@/domain/errors'
import { UnauthorizedError } from '@/application/errors'
import prisma from '@/infra/database/postgres/helpers/connection'

import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { ValidationPipe, type INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

describe('Account Route', () => {
  let app: INestApplication
  const { email, name, password } = accountParams

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

  describe('/POST register', () => {
    it('should return 201 on success', async () => {
      return await request(app.getHttpServer())
        .post('/register')
        .send({ name, email, password })
        .expect(201)
    })

    it('should return 400 if email already exists', async () => {
      await prisma.user.create({ data: { name, email, password } })
      const { status, body: { error } } = await request(app.getHttpServer())
        .post('/register')
        .send({ name, email, password })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldInUseError('email').message)
    })

    it('should return return 400 if has invalid data', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/register')
        .send({ email, password })

      expect(status).toBe(400)
      expect(body.message[0]).toEqual('name should not be empty')
    })
  })

  describe('/POST login', () => {
    it('should return 200 on success', async () => {
      await request(app.getHttpServer()).post('/register').send({ name, email, password })
      return await request(app.getHttpServer())
        .post('/login')
        .send({ email, password })
        .expect(200)
    })

    it('should return 401 if account does not exists', async () => {
      const { status, body: { error } } = await request(app.getHttpServer())
        .post('/login')
        .send({ email, password })

      expect(status).toBe(401)
      expect(error).toEqual(new UnauthorizedError().message)
    })
  })
})
