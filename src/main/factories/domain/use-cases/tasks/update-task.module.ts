import { Module } from '@nestjs/common'
import { updateTaskUseCase } from '@/domain/use-cases/tasks'
import { type LoadTaskById, type UpdateTaskRepository } from '@/domain/contracts/database/repositories/tasks'
import { TasksRepository } from '@/infra/database/postgres/repositories'
import { TasksRepositoryModule } from '@/main/factories/infra/database/postgres/repositories'

@Module({
  imports: [TasksRepositoryModule],
  providers: [
    {
      provide: updateTaskUseCase,
      useFactory: (tasks: LoadTaskById & UpdateTaskRepository) => {
        return updateTaskUseCase(tasks)
      },
      inject: [TasksRepository]
    }
  ],
  exports: [updateTaskUseCase]
})
export class UpdateTaskModule {}
