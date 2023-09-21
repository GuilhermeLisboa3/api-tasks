import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { SignUpControllerModule, LoginControllerModule } from '../factories/application/controllers/account'

@Module({
  imports: [SignUpControllerModule, LoginControllerModule],
  controllers: [AccountController]
})
export class RoutesModule {}
