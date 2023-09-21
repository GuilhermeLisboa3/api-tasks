import { Module } from '@nestjs/common'
import { JwtAdapter } from '@/infra/gateways'
import { ConfigService } from '@nestjs/config'

@Module({
  providers: [
    {
      provide: JwtAdapter,
      useFactory: (config: ConfigService) => {
        return new JwtAdapter(config.get<string>('secret'))
      },
      inject: [ConfigService]
    }
  ],
  exports: [JwtAdapter]
})
export class JwtAdapterModule {}
