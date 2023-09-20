import { type Authentication } from '@/domain/use-cases/account'
import { Controller } from '../controller'
import { ok, type HttpResponse } from '@/application/helpers'

type HttpRequest = { email: string, password: string }

export class LoginController extends Controller {
  constructor (private readonly authentication: Authentication) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    const result = await this.authentication(input)
    return ok(result)
  }
}
