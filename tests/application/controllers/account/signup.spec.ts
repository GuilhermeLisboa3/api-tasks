import { accountParams } from '@/tests/mocks'
import { SignUpController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers/controller'
import { FieldInUseError } from '@/domain/errors'

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

  it('should return badRequest if addAccount return FieldInUseError', async () => {
    addAccount.mockRejectedValueOnce(new FieldInUseError('name'))
    const { statusCode, data } = await sut.handle({ name, email, password })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldInUseError('name'))
  })

  it('should return created on success', async () => {
    const { statusCode } = await sut.handle({ name, email, password })

    expect(statusCode).toBe(201)
  })
})
