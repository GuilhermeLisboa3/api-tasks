import { accountParams } from '@/tests/mocks/'
import { type LoadAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type HashComparer } from '@/domain/contracts/gateways'
import { type Authentication, authenticationUseCase } from '@/domain/use-cases/account'
import { AuthenticationError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('Authentication', () => {
  let sut: Authentication

  const accountRepository = mock<LoadAccountByEmail>()
  const hash = mock<HashComparer>()
  const { email, password, name, id } = accountParams

  beforeAll(() => {
    accountRepository.loadByEmail.mockResolvedValue({ id, name, email, password })
  })

  beforeEach(() => {
    sut = authenticationUseCase(accountRepository, hash)
    hash.compare.mockResolvedValue(true)
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

  it('should call hashComparer with correct values', async () => {
    await sut({ email, password })

    expect(hash.compare).toHaveBeenCalledWith({ plaintext: password, digest: password })
    expect(hash.compare).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if HashComparer return false', async () => {
    hash.compare.mockResolvedValueOnce(false)

    const result = sut({ email, password })

    await expect(result).rejects.toThrow(new AuthenticationError())
  })
})
