import { type HttpResponse, unauthorized } from '@/application/helpers'
import { type Middleware } from '@/application/middlewares'

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware implements Middleware {
  async handle ({ authorization }: HttpRequest): Promise<HttpResponse> {
    if (!authorization) return unauthorized()
  }
}
