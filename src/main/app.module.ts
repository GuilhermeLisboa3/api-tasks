import { Module } from '@nestjs/common'
import { RoutesModule } from './routes/routes.module'
import { APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from './validations/intercept-validation'
import configuration from '@/main/config/env'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    RoutesModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
