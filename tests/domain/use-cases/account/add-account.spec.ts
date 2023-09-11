import { accountParams } from '@/tests/mocks/'
import { type CheckAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type AddAccount, addAccountUseCase } from '@/domain/use-cases/account'
import { FieldInUseError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddAccount', () => {
  let sut: AddAccount

  const { name, email, password } = accountParams

  const accountRepository = mock<CheckAccountByEmail>()

  beforeAll(() => {
    accountRepository.checkByEmail.mockResolvedValueOnce(false)
  })

  beforeEach(() => {
    sut = addAccountUseCase(accountRepository)
  })

  it('should call CheckAccountByEmail with correct email', async () => {
    await sut({ name, email, password })

    expect(accountRepository.checkByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckAccountByEmailRepository return true', async () => {
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new FieldInUseError('email'))
  })
})
