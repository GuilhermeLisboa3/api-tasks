import { tasksParams } from '@/tests/mocks'
import { DeleteTaskController } from '@/application/controllers/tasks'
import { Controller } from '@/application/controllers/controller'
import { NotFoundError } from '@/domain/errors'

describe('DeleteTaskController', () => {
  let sut: DeleteTaskController

  const deleteTask = jest.fn()

  const { id } = tasksParams

  beforeEach(() => {
    sut = new DeleteTaskController(deleteTask)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call deleteTask with correct values', async () => {
    await sut.perform({ id })

    expect(deleteTask).toHaveBeenCalledWith({ id })
    expect(deleteTask).toHaveBeenCalledTimes(1)
  })

  it('should return notFound if deleteTask return NotFoundError', async () => {
    deleteTask.mockRejectedValueOnce(new NotFoundError('id'))
    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(404)
    expect(data).toEqual(new NotFoundError('id'))
  })
})
