import { Module } from '@nestjs/common'
import { authorizeUseCase } from '@/domain/use-cases/account'
import { type LoadAccountById } from '@/domain/contracts/database/repositories/account'
import { type TokenValidator } from '@/domain/contracts/gateways'
import { AccountRepository } from '@/infra/database/postgres/repositories'
import { JwtAdapter } from '@/infra/gateways'
import { AccountRepositoryModule } from '@/main/factories/infra/database/postgres/repositories/account.module'
import { JwtAdapterModule } from '@/main/factories/infra/gateways'

@Module({
  imports: [AccountRepositoryModule, JwtAdapterModule],
  providers: [
    {
      provide: authorizeUseCase,
      useFactory: (token: TokenValidator, account: LoadAccountById) => {
        return authorizeUseCase(token, account)
      },
      inject: [JwtAdapter, AccountRepository]
    }
  ],
  exports: [authorizeUseCase]
})
export class AuthorizeModule {}
