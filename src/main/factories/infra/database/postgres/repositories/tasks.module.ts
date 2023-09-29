import { Module } from '@nestjs/common'
import { TasksRepository } from '@/infra/database/postgres/repositories'
@Module({
  providers: [
    {
      provide: TasksRepository,
      useClass: TasksRepository
    }
  ],
  exports: [TasksRepository]
})
export class TasksRepositoryModule {}
