import { Module } from '@nestjs/common'
import { type Authorize, authorizeUseCase } from '@/domain/use-cases/account'
import { AuthenticationMiddleware } from '@/application/middlewares'
import { AuthorizeModule } from '@/main/factories/domain/use-cases/account'

@Module({
  imports: [AuthorizeModule],
  providers: [
    {
      provide: AuthenticationMiddleware,
      useFactory: (authorize: Authorize) => {
        return new AuthenticationMiddleware(authorize)
      },
      inject: [authorizeUseCase]
    }
  ],
  exports: [AuthenticationMiddleware]
})
export class AuthenticationMiddlewareModule {}
