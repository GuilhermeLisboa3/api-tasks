import { accountParams } from '@/tests/mocks'
import { ForbiddenError, UnauthorizedError } from '@/application/errors'
import { AuthenticationMiddleware } from '@/application/middlewares'
import { AuthenticationError, PermissionError } from '@/domain/errors'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware

  const { accessToken, id: accountId } = accountParams
  const authorization = `Bearer ${accessToken}`
  const authorize = jest.fn()

  beforeAll(() => {
    authorize.mockResolvedValue({ accountId })
  })

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize)
  })

  it('should return unauthorized if authorization is empty', async () => {
    const { statusCode, data } = await sut.handle({ authorization: '' })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('should return unauthorized if authorization is undefined', async () => {
    const { statusCode, data } = await sut.handle({ authorization: undefined as any })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('should return unauthorized if authorization is null', async () => {
    const { statusCode, data } = await sut.handle({ authorization: null as any })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('should call authorize with correct values', async () => {
    await sut.handle({ authorization })

    expect(authorize).toHaveBeenCalledWith({ accessToken })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should return unauthorized if authorize return AuthenticationError', async () => {
    authorize.mockRejectedValueOnce(new AuthenticationError())

    const { statusCode, data } = await sut.handle({ authorization })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('should return forbidden if authorize return PermissionError', async () => {
    authorize.mockRejectedValueOnce(new PermissionError())

    const { statusCode, data } = await sut.handle({ authorization })

    expect(statusCode).toBe(403)
    expect(data).toEqual(new ForbiddenError())
  })

  it('should return ok on success', async () => {
    const { statusCode, data } = await sut.handle({ authorization })

    expect(statusCode).toBe(200)
    expect(data).toEqual({ accountId })
  })
})
