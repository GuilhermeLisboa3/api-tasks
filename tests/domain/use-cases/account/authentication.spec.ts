import { accountParams } from '@/tests/mocks/'
import { type LoadAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type Authentication, authenticationUseCase } from '@/domain/use-cases/account'

import { mock } from 'jest-mock-extended'

describe('Authentication', () => {
  let sut: Authentication

  const accountRepository = mock<LoadAccountByEmail>()
  const { email, password } = accountParams

  beforeEach(() => {
    sut = authenticationUseCase(accountRepository)
  })

  it('should call LoadAccountByEmail with correct email', async () => {
    await sut({ email, password })

    expect(accountRepository.loadByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })
})
