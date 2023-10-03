import { type UpdateTask } from '@/domain/use-cases/tasks'

type HttpRequest = { id: string, title?: string, description?: string, completed?: boolean }

export class UpdateTaskController {
  constructor (private readonly updateTask: UpdateTask) {}

  async perform (input: HttpRequest): Promise<void> {
    await this.updateTask(input)
  }
}
