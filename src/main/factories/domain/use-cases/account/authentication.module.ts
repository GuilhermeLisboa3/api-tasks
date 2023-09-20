import { Module } from '@nestjs/common'
import { authenticationUseCase } from '@/domain/use-cases/account'
import { type LoadAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type TokenGenerator, type HashComparer } from '@/domain/contracts/gateways'
import { AccountRepository } from '@/infra/database/postgres/repositories'
import { BcryptAdapter } from '@/infra/gateways'
import { AccountRepositoryModule } from '@/main/factories/infra/database/postgres/repositories/account.module'
import { BcryptAdapterModule, JwtAdapterModule } from '@/main/factories/infra/gateways'

@Module({
  imports: [AccountRepositoryModule, BcryptAdapterModule, JwtAdapterModule],
  providers: [
    {
      provide: authenticationUseCase,
      useFactory: (account: LoadAccountByEmail, hash: HashComparer, token: TokenGenerator) => {
        return authenticationUseCase(account, hash, token)
      },
      inject: [AccountRepository, BcryptAdapter, JwtAdapterModule]
    }
  ],
  exports: [authenticationUseCase]
})
export class AuthenticationModule {}
