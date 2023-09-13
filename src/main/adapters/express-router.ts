import { type Controller } from '@/application/controllers/controller'

export const nestResponseAdapter = (controller: Controller) => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.body, ...req.params })
  const json = [201].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}
