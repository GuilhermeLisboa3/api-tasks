import { serverError, type HttpResponse, badRequest, unauthorized, notFound } from '@/application/helpers'
import { AuthenticationError, FieldInUseError, NotFoundError } from '@/domain/errors'

export abstract class Controller {
  abstract perform (httpRequest?: any): Promise<HttpResponse>
  async handle (httpRequest?: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      if (error instanceof FieldInUseError) return badRequest(error)
      if (error instanceof NotFoundError) return notFound(error)
      if (error instanceof AuthenticationError) return unauthorized()
      return serverError(error)
    }
  }
}
