import { Module } from '@nestjs/common'
import { type AddAccount, addAccountUseCase } from '@/domain/use-cases/account'
import { SignUpController } from '@/application/controllers/account'
import { AddAccountModule } from '@/main/factories/domain/use-cases/account'

@Module({
  imports: [AddAccountModule],
  providers: [
    {
      provide: SignUpController,
      useFactory: (addAccount: AddAccount) => {
        return new SignUpController(addAccount)
      },
      inject: [addAccountUseCase]
    }
  ],
  exports: [SignUpController]
})
export class SignUpControllerModule {}
