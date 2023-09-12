import { Controller } from '@/application/controllers/controller'
import { type HttpResponse } from '@/application/helpers'
import { ServerError } from '@/application/errors'

import { faker } from '@faker-js/faker'

class ControllerStub extends Controller {
  result: HttpResponse = { statusCode: 200, data: faker.lorem.word() }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  let value: any
  let errorObject: Error

  beforeAll(() => {
    value = faker.lorem.word()
    errorObject = new Error(faker.lorem.word())
  })

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('should return serverError if perform throw', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(errorObject)

    const { statusCode, data } = await sut.handle(value)

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(errorObject))
  })
})
