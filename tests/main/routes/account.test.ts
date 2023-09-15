import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { type INestApplication } from '@nestjs/common'
import { accountParams } from '@/tests/mocks'
import { RoutesModule } from '@/main/routes/routes.module'

describe('Account Route', () => {
  let app: INestApplication
  const { email, name, password } = accountParams

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RoutesModule]
    })
      .compile()

    app = moduleRef.createNestApplication()
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
  })
})
