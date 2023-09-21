import { Body, Controller, Post, Res } from '@nestjs/common'
import { LoginController, SignUpController } from '@/application/controllers/account'
import { nestResponseAdapter } from '../adapters'
import { type HttpResponse } from '../../application/helpers'
import { LoginDto, SignUpDto } from './dto/account'

@Controller('')
export class AccountController {
  constructor (
    private readonly signUpController: SignUpController,
    private readonly loginController: LoginController
  ) {}

  @Post('register')
  async create (@Body() input: SignUpDto, @Res() res): Promise<HttpResponse> {
    const response = await this.signUpController.handle(input)
    return await nestResponseAdapter(response, res)
  }

  @Post('login')
  async authentication (@Body() input: LoginDto, @Res() res): Promise<HttpResponse> {
    const response = await this.loginController.handle(input)
    return await nestResponseAdapter(response, res)
  }
}
