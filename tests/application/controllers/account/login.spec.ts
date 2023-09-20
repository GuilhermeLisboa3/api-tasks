import { accountParams } from '@/tests/mocks'
import { LoginController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers/controller'

describe('LoginController', () => {
  let sut: LoginController

  const authentication = jest.fn()

  const { email, password } = accountParams

  beforeEach(() => {
    sut = new LoginController(authentication)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call authentication with correct values', async () => {
    await sut.perform({ email, password })

    expect(authentication).toHaveBeenCalledWith({ email, password })
    expect(authentication).toHaveBeenCalledTimes(1)
  })
})
