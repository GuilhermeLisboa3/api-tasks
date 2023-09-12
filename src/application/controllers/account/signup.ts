import { type AddAccount } from '@/domain/use-cases/account'

type HttpRequest = { name: string, email: string, password: string }

export class SignUpController {
  constructor (private readonly addAccount: AddAccount) {}

  async perform (input: HttpRequest): Promise<void> {
    await this.addAccount(input)
  }
}
