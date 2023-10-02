import { AuthenticationMiddlewareRouter } from '@/main/adapters'
import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common'
import { RoutesModule } from './routes/routes.module'
import { APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from './validations/intercept-validation'
import configuration from '@/main/config/env'
import { ConfigModule } from '@nestjs/config'
import { AuthenticationMiddlewareModule } from './factories/application/middlewares'
import { TasksController } from './routes/tasks.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AuthenticationMiddlewareModule,
    RoutesModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthenticationMiddlewareRouter)
      .forRoutes(TasksController)
  }
}
