import { type DeleteTask } from '@/domain/use-cases/tasks'

type HttpRequest = { id: string }

export class DeleteTaskController {
  constructor (private readonly deleteTask: DeleteTask) {}

  async perform (input: HttpRequest): Promise<void> {
    await this.deleteTask(input)
  }
}
