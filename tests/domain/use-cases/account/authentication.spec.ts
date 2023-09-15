import { accountParams } from '@/tests/mocks/'
import { type LoadAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type Authentication, authenticationUseCase } from '@/domain/use-cases/account'
import { AuthenticationError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('Authentication', () => {
  let sut: Authentication

  const accountRepository = mock<LoadAccountByEmail>()
  const { email, password, name, id } = accountParams

  beforeAll(() => {
    accountRepository.loadByEmail.mockResolvedValue({ id, name, email, password })
  })

  beforeEach(() => {
    sut = authenticationUseCase(accountRepository)
  })

  it('should call LoadAccountByEmail with correct email', async () => {
    await sut({ email, password })

    expect(accountRepository.loadByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if LoadAccountByEmailRepository return null', async () => {
    accountRepository.loadByEmail.mockResolvedValueOnce(null)

    const result = sut({ email, password })

    await expect(result).rejects.toThrow(new AuthenticationError())
  })
})
