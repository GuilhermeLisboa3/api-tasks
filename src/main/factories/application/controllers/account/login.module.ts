import { Module } from '@nestjs/common'
import { type Authentication, authenticationUseCase } from '@/domain/use-cases/account'
import { LoginController } from '@/application/controllers/account'
import { AuthenticationModule } from '@/main/factories/domain/use-cases/account'

@Module({
  imports: [AuthenticationModule],
  providers: [
    {
      provide: LoginController,
      useFactory: (authentication: Authentication) => {
        return new LoginController(authentication)
      },
      inject: [authenticationUseCase]
    }
  ],
  exports: [LoginController]
})
export class LoginControllerModule {}
