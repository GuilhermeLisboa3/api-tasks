import { type HttpResponse, unauthorized, forbidden } from '@/application/helpers'
import { type Middleware } from '@/application/middlewares'
import { type Authorize } from '@/domain/use-cases/account'
import { AuthenticationError, PermissionError } from '@/domain/errors'

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly authorize: Authorize) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse> {
    try {
      if (!authorization) return unauthorized()
      const [, accessToken] = authorization.split(' ')
      await this.authorize({ accessToken })
    } catch (error) {
      if (error instanceof AuthenticationError) return unauthorized()
      if (error instanceof PermissionError) return forbidden()
    }
  }
}
