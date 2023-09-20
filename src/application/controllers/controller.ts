import { serverError, type HttpResponse, badRequest, unauthorized } from '@/application/helpers'
import { AuthenticationError, FieldInUseError } from '../../domain/errors'

export abstract class Controller {
  abstract perform (httpRequest?: any): Promise<HttpResponse>
  async handle (httpRequest?: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      if (error instanceof FieldInUseError) return badRequest(error)
      if (error instanceof AuthenticationError) return unauthorized()
      return serverError(error)
    }
  }
}
