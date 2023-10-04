import { type ListTasks } from '@/domain/use-cases/tasks'
import { Controller } from '@/application/controllers/controller'
import { ok, type HttpResponse } from '@/application/helpers'

type HttpRequest = { accountId: string }

export class ListTasksController extends Controller {
  constructor (private readonly listTasks: ListTasks) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    const tasks = await this.listTasks(input)
    return ok(tasks)
  }
}
