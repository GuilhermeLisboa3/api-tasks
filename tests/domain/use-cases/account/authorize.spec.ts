import { accountParams } from '@/tests/mocks'
import { type Authorize, authorizeUseCase } from '@/domain/use-cases/account'
import { type TokenValidator } from '@/domain/contracts/gateways'
import { type LoadAccountById } from '@/domain/contracts/database/repositories/account'
import { AuthenticationError, PermissionError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AuthorizeUseCase', () => {
  let sut: Authorize

  const token = mock<TokenValidator>()
  const accountRepository = mock<LoadAccountById>()
  const { accessToken, error, id, name, email, password } = accountParams

  beforeAll(() => {
    token.validate.mockResolvedValue(id)
    accountRepository.loadById.mockResolvedValue({ id, email, name, password })
  })

  beforeEach(() => {
    sut = authorizeUseCase(token, accountRepository)
  })

  it('should call TokenValidator with correct value', async () => {
    await sut({ accessToken })

    expect(token.validate).toHaveBeenCalledWith({ token: accessToken })
    expect(token.validate).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if TokenValidator throws', async () => {
    token.validate.mockRejectedValueOnce(error)
    const promise = sut({ accessToken })

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })

  it('should call LoadAccountById with correct value', async () => {
    await sut({ accessToken })

    expect(accountRepository.loadById).toHaveBeenCalledWith({ id })
    expect(accountRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should throw PermissionError if LoadAccountById return undefined', async () => {
    accountRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut({ accessToken })

    await expect(promise).rejects.toThrow(new PermissionError())
  })
})
