import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { SignUpControllerModule } from '../factories/application/controllers/account/signup.module'

@Module({
  imports: [SignUpControllerModule],
  controllers: [AccountController]
})
export class RoutesModule {}
