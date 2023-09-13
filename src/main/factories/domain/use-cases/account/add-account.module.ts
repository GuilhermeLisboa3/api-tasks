import { Module } from '@nestjs/common'
import { addAccountUseCase } from '@/domain/use-cases/account'
import { type AddAccountRepository, type CheckAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type HashGenerator } from '@/domain/contracts/gateways'
import { AccountRepository } from '@/infra/database/postgres/repositories'
import { BcryptAdapter } from '@/infra/gateways'
import { AccountRepositoryModule } from '@/main/factories/infra/database/postgres/repositories/account.module'
import { BcryptAdapterModule } from '@/main/factories/infra/gateways/bcrypt-adapter.module'

@Module({
  imports: [AccountRepositoryModule, BcryptAdapterModule],
  providers: [
    {
      provide: addAccountUseCase,
      useFactory: (account: CheckAccountByEmail & AddAccountRepository, hash: HashGenerator) => {
        return addAccountUseCase(account, hash)
      },
      inject: [AccountRepository, BcryptAdapter]
    }
  ],
  exports: [addAccountUseCase]
})
export class AddAccountModule {}
