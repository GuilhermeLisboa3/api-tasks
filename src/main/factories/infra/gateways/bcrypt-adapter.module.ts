import { Module } from '@nestjs/common'
import { BcryptAdapter } from '@/infra/gateways'

@Module({
  providers: [
    {
      provide: BcryptAdapter,
      useClass: BcryptAdapter
    }
  ],
  exports: [BcryptAdapter]
})
export class BcryptAdapterModule {}
