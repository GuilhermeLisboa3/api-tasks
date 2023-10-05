import { type DeleteTask } from '@/domain/use-cases/tasks'
import { Controller } from '../controller'
import { noContent, type HttpResponse } from '@/application/helpers'

type HttpRequest = { id: string }

export class DeleteTaskController extends Controller {
  constructor (private readonly deleteTask: DeleteTask) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.deleteTask(input)
    return noContent()
  }
}
