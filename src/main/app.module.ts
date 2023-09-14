import { Module } from '@nestjs/common'
import { RoutesModule } from './routes/routes.module'
import { APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from './validations/intercept-validation'
@Module({
  imports: [
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
