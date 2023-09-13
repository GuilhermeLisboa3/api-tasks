import { Body, Controller, Post, Res } from '@nestjs/common'
import { SignUpController } from '@/application/controllers/account'
import { nestResponseAdapter } from '../adapters'
import { type HttpResponse } from '../../application/helpers'
import { SignUpDto } from './dto/account'

@Controller('')
export class AccountController {
  constructor (private readonly signUpController: SignUpController) {}

  @Post('register')
  async create (@Body() input: SignUpDto, @Res() res): Promise<HttpResponse> {
    const response = await this.signUpController.handle(input)
    return await nestResponseAdapter(response, res)
  }
}
