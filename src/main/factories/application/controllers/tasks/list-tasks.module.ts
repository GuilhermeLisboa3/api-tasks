import { Module } from '@nestjs/common'
import { ListTasksController } from '@/application/controllers/tasks'
import { TasksRepositoryModule } from '@/main/factories/infra/database/postgres/repositories/tasks.module'
import { TasksRepository } from '@/infra/database/postgres/repositories'

@Module({
  imports: [TasksRepositoryModule],
  providers: [
    {
      provide: ListTasksController,
      useFactory: (listTasks: TasksRepository) => {
        return new ListTasksController(listTasks.list.bind(TasksRepository))
      },
      inject: [TasksRepository]
    }
  ],
  exports: [ListTasksController]
})
export class ListTasksControllerModule {}
