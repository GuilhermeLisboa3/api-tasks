import { type HttpResponse, unauthorized } from '@/application/helpers'
import { type Middleware } from '@/application/middlewares'
import { type Authorize } from '@/domain/use-cases/account'

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly authorize: Authorize) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse> {
    if (!authorization) return unauthorized()
    const [, accessToken] = authorization.split(' ')
    await this.authorize({ accessToken })
  }
}
