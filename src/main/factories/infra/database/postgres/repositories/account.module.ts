import { Module } from '@nestjs/common'
import { AccountRepository } from '@/infra/database/postgres/repositories'
@Module({
  providers: [
    {
      provide: AccountRepository,
      useClass: AccountRepository
    }
  ],
  exports: [AccountRepository]
})
export class AccountRepositoryModule {}
