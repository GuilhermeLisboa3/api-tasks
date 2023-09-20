import { type Authentication } from '@/domain/use-cases/account'

type HttpRequest = { email: string, password: string }

export class LoginController {
  constructor (private readonly authentication: Authentication) { }

  async perform (input: HttpRequest): Promise<void> {
    await this.authentication(input)
  }
}
