import { accountParams } from '@/tests/mocks'
import { LoginController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers/controller'
import { AuthenticationError } from '@/domain/errors'
import { UnauthorizedError } from '@/application/errors'

describe('LoginController', () => {
  let sut: LoginController

  const authentication = jest.fn()

  const { email, password, name, accessToken } = accountParams

  beforeAll(() => {
    authentication.mockResolvedValue({ name, accessToken })
  })

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

  it('should return unauthorized if authentication return AuthenticationError', async () => {
    authentication.mockRejectedValueOnce(new AuthenticationError())
    const { statusCode, data } = await sut.handle({ email, password })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('should return ok if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ email, password })

    expect(statusCode).toBe(200)
    expect(data).toEqual({ name, accessToken })
  })
})
