import { LoginController, SignUpController } from '@/application/controllers/account'
import { nestResponseAdapter } from '@/main/adapters'
import { type HttpResponse } from '@/application/helpers'
import { LoginDto, SignUpDto } from '@/main/routes/dto/account'
import { swaggerBadRequest, swaggerCreated, swaggerInternalServerError, swaggerOk } from '@/main/docs/swagger/paths'
import { LoginResponse } from '../docs/swagger/shemas'

import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('account')
@Controller('')
export class AccountController {
  constructor (
    private readonly signUpController: SignUpController,
    private readonly loginController: LoginController
  ) {}

  @ApiCreatedResponse(swaggerCreated())
  @ApiBadRequestResponse(swaggerBadRequest())
  @ApiInternalServerErrorResponse(swaggerInternalServerError())
  @Post('register')
  async create (@Body() input: SignUpDto, @Res() res): Promise<HttpResponse> {
    const response = await this.signUpController.handle(input)
    return await nestResponseAdapter(response, res)
  }

  @ApiOkResponse(swaggerOk(LoginResponse))
  @ApiBadRequestResponse(swaggerBadRequest())
  @ApiInternalServerErrorResponse(swaggerInternalServerError())
  @Post('login')
  async authentication (@Body() input: LoginDto, @Res() res): Promise<HttpResponse> {
    const response = await this.loginController.handle(input)
    return await nestResponseAdapter(response, res)
  }
}
