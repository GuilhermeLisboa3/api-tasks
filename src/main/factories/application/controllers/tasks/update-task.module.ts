import { Module } from '@nestjs/common'
import { type UpdateTask, updateTaskUseCase } from '@/domain/use-cases/tasks'
import { UpdateTaskController } from '@/application/controllers/tasks'
import { UpdateTaskModule } from '@/main/factories/domain/use-cases/tasks'

@Module({
  imports: [UpdateTaskModule],
  providers: [
    {
      provide: UpdateTaskController,
      useFactory: (updateTask: UpdateTask) => {
        return new UpdateTaskController(updateTask)
      },
      inject: [updateTaskUseCase]
    }
  ],
  exports: [UpdateTaskController]
})
export class UpdateTaskControllerModule {}
