import { Module } from '@nestjs/common'
import { type AddTasks, addTasksUseCase } from '@/domain/use-cases/tasks'
import { AddTasksController } from '@/application/controllers/tasks'
import { AddTasksModule } from '@/main/factories/domain/use-cases/tasks'

@Module({
  imports: [AddTasksModule],
  providers: [
    {
      provide: AddTasksController,
      useFactory: (addTasks: AddTasks) => {
        return new AddTasksController(addTasks)
      },
      inject: [addTasksUseCase]
    }
  ],
  exports: [AddTasksController]
})
export class AddTasksControllerModule {}
