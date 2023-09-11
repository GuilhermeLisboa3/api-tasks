import { accountParams } from '@/tests/mocks/'
import { type CheckAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type AddAccount, addAccountUseCase } from '@/domain/use-cases/account'
import { type HashGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddAccount', () => {
  let sut: AddAccount

  const { name, email, password } = accountParams

  const accountRepository = mock<CheckAccountByEmail>()
  const hash = mock<HashGenerator>()

  beforeAll(() => {
    accountRepository.checkByEmail.mockResolvedValueOnce(false)
  })

  beforeEach(() => {
    sut = addAccountUseCase(accountRepository, hash)
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

  it('should call HashGenerator with correct plaintext', async () => {
    await sut({ name, email, password })

    expect(hash.generate).toHaveBeenCalledWith({ plaintext: password })
    expect(hash.generate).toHaveBeenCalledTimes(1)
  })
})
