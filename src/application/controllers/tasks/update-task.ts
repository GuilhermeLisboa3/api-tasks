import { type UpdateTask } from '@/domain/use-cases/tasks'
import { Controller } from '../controller'
import { noContent, type HttpResponse } from '@/application/helpers'

type HttpRequest = { id: string, title?: string, description?: string, completed?: boolean }

export class UpdateTaskController extends Controller {
  constructor (private readonly updateTask: UpdateTask) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.updateTask(input)
    return noContent()
  }
}
