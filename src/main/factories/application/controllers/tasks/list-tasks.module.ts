import { Module } from '@nestjs/common'
import { type ListTasks } from '@/domain/use-cases/tasks'
import { ListTasksController } from '@/application/controllers/tasks'
import { TasksRepositoryModule } from '@/main/factories/infra/database/postgres/repositories/tasks.module'
import { TasksRepository } from '@/infra/database/postgres/repositories'

@Module({
  imports: [TasksRepositoryModule],
  providers: [
    {
      provide: ListTasksController,
      useFactory: (listTasks: ListTasks) => {
        return new ListTasksController(listTasks)
      },
      inject: [TasksRepository]
    }
  ],
  exports: [ListTasksController]
})
export class ListTasksControllerModule {}
