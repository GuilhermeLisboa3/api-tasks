import { AccountRepository } from '@/infra/database/postgres/repositories'
import { accountParams, resetDataBase } from '@/tests/mocks'
import prisma from '@/infra/database/postgres/helpers/connection'

describe('AccountRepository', () => {
  let sut: AccountRepository
  const { id, email, name, password } = accountParams

  beforeEach(async () => {
    await resetDataBase()
    sut = new AccountRepository()
  })

  describe('checkByEmail()', () => {
    it('should return false if email does not exists', async () => {
      const result = await sut.checkByEmail({ email })

      expect(result).toBe(false)
    })

    it('should return true if email already exists', async () => {
      await prisma.user.create({ data: { name, email, password } })

      const result = await sut.checkByEmail({ email })

      expect(result).toBe(true)
    })
  })

  describe('create()', () => {
    it('should create a account on success', async () => {
      await sut.create({ name, email, password })

      const user = await prisma.user.findFirst({ where: { email } })

      expect(user).toBeTruthy()
    })
  })

  describe('loadByEmail()', () => {
    it('should return undefined if account does not exists', async () => {
      const result = await sut.loadByEmail({ email })

      expect(result).toBeUndefined()
    })

    it('should return account on success', async () => {
      await prisma.user.create({ data: { id, name, email, password } })

      const result = await sut.loadByEmail({ email })

      expect(result).toEqual({
        id,
        name,
        email,
        password
      })
    })
  })

  describe('loadById()', () => {
    it('should return undefined if account does not exists', async () => {
      const result = await sut.loadById({ id })

      expect(result).toBeUndefined()
    })

    it('should return account on success', async () => {
      await prisma.user.create({ data: { id, name, email, password } })

      const result = await sut.loadById({ id })

      expect(result).toEqual({
        id,
        name,
        email,
        password
      })
    })
  })
})
