import { ServerError, UnauthorizedError } from '../errors'

export type HttpResponse<T = any> = { statusCode: number, data: T }

export const ok = <T = any> (data?: T): HttpResponse<T | undefined> => ({
  statusCode: 200,
  data
})

export const created = <T = any> (): HttpResponse<T | undefined> => ({
  statusCode: 201,
  data: null
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError()
})

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  data: error
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})
