import { type AddAccount } from '@/domain/use-cases/account'
import { Controller } from '../controller'
import { created, type HttpResponse } from '@/application/helpers'

type HttpRequest = { name: string, email: string, password: string }

export class SignUpController extends Controller {
  constructor (private readonly addAccount: AddAccount) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.addAccount(input)
    return created()
  }
}
