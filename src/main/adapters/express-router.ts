import { type HttpResponse } from '@/application/helpers'

export const nestResponseAdapter = async ({ data, statusCode }: HttpResponse, res): Promise<HttpResponse> => {
  const json = [201].includes(statusCode) ? data : { error: data.message }
  return res.status(statusCode).json(json)
}
