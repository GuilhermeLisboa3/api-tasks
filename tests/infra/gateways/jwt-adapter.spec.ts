import { JwtAdapter } from '@/infra/gateways'

import * as jwt from 'jsonwebtoken'
import { faker } from '@faker-js/faker'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let sut: JwtAdapter
  let secret: string
  let token: string
  const fakeJwt = jwt as jest.Mocked<typeof jwt>

  beforeAll(() => {
    secret = faker.string.uuid()
    token = faker.string.uuid()
  })

  beforeEach(() => {
    sut = new JwtAdapter(secret)
  })

  describe('generate()', () => {
    let key: string

    beforeEach(() => {
      fakeJwt.sign.mockImplementation(() => token)
      key = faker.lorem.word()
    })

    it('should call sign with correct values', async () => {
      await sut.generate({ key })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: '2d' })
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should return a accessToken on success', async () => {
      const accessToken = await sut.generate({ key })

      expect(accessToken).toBe(token)
    })
  })

  describe('validate()', () => {
    let key: string

    beforeAll(() => {
      key = faker.string.uuid()
      fakeJwt.verify.mockImplementation(() => ({ key }))
    })

    it('should call verify with correct values', async () => {
      await sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
    })

    it('should return a key on success', async () => {
      const result = await sut.validate({ token })

      expect(result).toBe(key)
    })
  })
})
