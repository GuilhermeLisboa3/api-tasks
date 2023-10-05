import { Module } from '@nestjs/common'
import { type DeleteTask, deleteTaskUseCase } from '@/domain/use-cases/tasks'
import { DeleteTaskController } from '@/application/controllers/tasks'
import { DeleteTaskModule } from '@/main/factories/domain/use-cases/tasks'

@Module({
  imports: [DeleteTaskModule],
  providers: [
    {
      provide: DeleteTaskController,
      useFactory: (deleteTask: DeleteTask) => {
        return new DeleteTaskController(deleteTask)
      },
      inject: [deleteTaskUseCase]
    }
  ],
  exports: [DeleteTaskController]
})
export class DeleteTaskControllerModule {}
