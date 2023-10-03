import { tasksParams } from '@/tests/mocks'
import { UpdateTaskController } from '@/application/controllers/tasks'
import { Controller } from '@/application/controllers/controller'
import { NotFoundError } from '@/domain/errors'

describe('UpdateTaskController', () => {
  let sut: UpdateTaskController

  const updateTask = jest.fn()

  const { title, description, id } = tasksParams

  beforeEach(() => {
    sut = new UpdateTaskController(updateTask)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call updateTask with correct values', async () => {
    await sut.perform({ id, title, description })

    expect(updateTask).toHaveBeenCalledWith({ id, title, description })
    expect(updateTask).toHaveBeenCalledTimes(1)
  })

  it('should return notFound if addTasks return NotFoundError', async () => {
    updateTask.mockRejectedValueOnce(new NotFoundError('id'))
    const { statusCode, data } = await sut.handle({ id, title, description })

    expect(statusCode).toBe(404)
    expect(data).toEqual(new NotFoundError('id'))
  })
})
