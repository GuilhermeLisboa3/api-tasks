import { type ListTasks } from '@/domain/use-cases/tasks'
import { Controller } from '@/application/controllers/controller'
import { type HttpResponse } from '@/application/helpers'

type HttpRequest = { accountId: string }

export class ListTasksController extends Controller {
  constructor (private readonly listTasks: ListTasks) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.listTasks(input)
    return { statusCode: 200, data: null }
  }
}
