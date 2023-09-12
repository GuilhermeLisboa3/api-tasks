import { ServerError } from '../errors'

export type HttpResponse<T = any> = { statusCode: number, data: T }

export const created = <T = any> (data?: T): HttpResponse<T | undefined> => ({
  statusCode: 201,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})