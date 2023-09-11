import { AccountRepository } from '@/infra/database/postgres/repositories'
import { accountParams, resetDataBase } from '@/tests/mocks'

describe('AccountRepository', () => {
  let sut: AccountRepository
  const { email } = accountParams

  beforeEach(async () => {
    await resetDataBase()
    sut = new AccountRepository()
  })

  describe('checkByEmail()', () => {
    it('should return false if email does not exists', async () => {
      const result = await sut.checkByEmail({ email })

      expect(result).toBe(false)
    })
  })
})
