import { Module } from '@nestjs/common'
import { deleteTaskUseCase } from '@/domain/use-cases/tasks'
import { type LoadTaskById, type DeleteTaskRepository } from '@/domain/contracts/database/repositories/tasks'
import { TasksRepository } from '@/infra/database/postgres/repositories'
import { TasksRepositoryModule } from '@/main/factories/infra/database/postgres/repositories'

@Module({
  imports: [TasksRepositoryModule],
  providers: [
    {
      provide: deleteTaskUseCase,
      useFactory: (tasks: LoadTaskById & DeleteTaskRepository) => {
        return deleteTaskUseCase(tasks)
      },
      inject: [TasksRepository]
    }
  ],
  exports: [deleteTaskUseCase]
})
export class DeleteTaskModule {}
