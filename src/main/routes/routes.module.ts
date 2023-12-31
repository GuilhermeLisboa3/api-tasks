import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { SignUpControllerModule, LoginControllerModule } from '../factories/application/controllers/account'
import { AddTasksControllerModule, DeleteTaskControllerModule, ListTasksControllerModule, UpdateTaskControllerModule } from '../factories/application/controllers/tasks'
import { TasksController } from './tasks.controller'

@Module({
  imports: [
    SignUpControllerModule,
    LoginControllerModule,
    AddTasksControllerModule,
    UpdateTaskControllerModule,
    ListTasksControllerModule,
    DeleteTaskControllerModule
  ],
  controllers: [AccountController, TasksController]
})
export class RoutesModule {}
