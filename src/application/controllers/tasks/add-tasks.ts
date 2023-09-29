import { type AddTasks } from '@/domain/use-cases/tasks'

type HttpRequest = { title: string, description: string, accountId: string }

export class AddTasksController {
  constructor (private readonly addTasks: AddTasks) {}

  async perform (input: HttpRequest): Promise<void> {
    await this.addTasks(input)
  }
}
