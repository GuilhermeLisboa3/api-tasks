import { accountParams } from '@/tests/mocks'
import { SignUpController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers/controller'

describe('SignUpController', () => {
  let sut: SignUpController

  const addAccount = jest.fn()

  const { name, email, password } = accountParams

  beforeEach(() => {
    sut = new SignUpController(addAccount)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call addAccount with correct values', async () => {
    await sut.perform({ name, email, password })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
    expect(addAccount).toHaveBeenCalledTimes(1)
  })
})
