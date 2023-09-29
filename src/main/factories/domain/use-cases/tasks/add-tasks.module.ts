import { Module } from '@nestjs/common'
import { addTasksUseCase } from '@/domain/use-cases/tasks'
import { type LoadAccountById } from '@/domain/contracts/database/repositories/account'
import { type AddTasksRepository } from '@/domain/contracts/database/repositories/tasks'
import { AccountRepository, TasksRepository } from '@/infra/database/postgres/repositories'
import { AccountRepositoryModule, TasksRepositoryModule } from '@/main/factories/infra/database/postgres/repositories'

@Module({
  imports: [AccountRepositoryModule, TasksRepositoryModule],
  providers: [
    {
      provide: addTasksUseCase,
      useFactory: (account: LoadAccountById, tasks: AddTasksRepository) => {
        return addTasksUseCase(account, tasks)
      },
      inject: [AccountRepository, TasksRepository]
    }
  ],
  exports: [addTasksUseCase]
})
export class AddTasksModule {}
