import { Body, Controller, Post, Res } from '@nestjs/common'
import { SignUpController } from '@/application/controllers/account'
import { SignUpDto } from './dto/account'
import { type HttpResponse } from '@/application/helpers'

@Controller('')
export class AccountController {
  constructor (private readonly signUpController: SignUpController) {}

  @Post('register')
  async create (@Body() input: SignUpDto, @Res() response): Promise<HttpResponse> {
    const { data, statusCode } = await this.signUpController.handle(input)
    return response.status(statusCode).send(data)
  }
}
