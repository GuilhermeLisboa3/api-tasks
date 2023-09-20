import { accountParams } from '@/tests/mocks'
import { LoginController } from '@/application/controllers/account'

describe('LoginController', () => {
  let sut: LoginController

  const authentication = jest.fn()

  const { email, password } = accountParams

  beforeEach(() => {
    sut = new LoginController(authentication)
  })

  it('should call authentication with correct values', async () => {
    await sut.perform({ email, password })

    expect(authentication).toHaveBeenCalledWith({ email, password })
    expect(authentication).toHaveBeenCalledTimes(1)
  })
})
