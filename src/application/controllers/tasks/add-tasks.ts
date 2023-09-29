import { type AddTasks } from '@/domain/use-cases/tasks'
import { Controller } from '../controller'
import { noContent, type HttpResponse } from '@/application/helpers'

type HttpRequest = { title: string, description: string, accountId: string }

export class AddTasksController extends Controller {
  constructor (private readonly addTasks: AddTasks) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.addTasks(input)
    return noContent()
  }
}
