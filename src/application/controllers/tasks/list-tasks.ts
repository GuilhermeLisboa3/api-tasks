import { type ListTasks } from '@/domain/use-cases/tasks'

type HttpRequest = { accountId: string }

export class ListTasksController {
  constructor (private readonly listTasks: ListTasks) {}

  async perform (input: HttpRequest): Promise<void> {
    await this.listTasks(input)
  }
}
