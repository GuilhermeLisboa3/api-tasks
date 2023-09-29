import { accountParams } from '@/tests/mocks'
import { type Authorize, authorizeUseCase } from '@/domain/use-cases/account'
import { type TokenValidator } from '@/domain/contracts/gateways'

import { mock } from 'jest-mock-extended'

describe('AuthorizeUseCase', () => {
  let sut: Authorize

  const token = mock<TokenValidator>()
  const { accessToken } = accountParams

  beforeEach(() => {
    sut = authorizeUseCase(token)
  })

  it('should call TokenValidator with correct value', async () => {
    await sut({ accessToken })

    expect(token.validate).toHaveBeenCalledWith({ token: accessToken })
    expect(token.validate).toHaveBeenCalledTimes(1)
  })
})
