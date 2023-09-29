import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { SignUpControllerModule, LoginControllerModule } from '../factories/application/controllers/account'
import { AddTasksControllerModule } from '../factories/application/controllers/tasks'

@Module({
  imports: [SignUpControllerModule, LoginControllerModule, AddTasksControllerModule],
  controllers: [AccountController]
})
export class RoutesModule {}
