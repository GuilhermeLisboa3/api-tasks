import { Module } from '@nestjs/common'
import { JwtAdapter } from '@/infra/gateways'
import { env } from '@/main/config/env'

@Module({
  providers: [
    {
      provide: JwtAdapter,
      useFactory: () => {
        return new JwtAdapter(env.JWT.secret)
      }
    }
  ],
  exports: [JwtAdapter]
})
export class JwtAdapterModule {}
