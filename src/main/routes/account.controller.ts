import { Controller, Post, Req, Res } from '@nestjs/common'
import { SignUpController } from '@/application/controllers/account'
import { nestResponseAdapter } from '../adapters'

@Controller('')
export class AccountController {
  constructor (private readonly signUpController: SignUpController) {}

  @Post('register')
  async create (@Req() req, @Res() res): Promise<any> {
    return await nestResponseAdapter(this.signUpController)(req, res)
  }
}
