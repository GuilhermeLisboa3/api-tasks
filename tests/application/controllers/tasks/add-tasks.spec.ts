import { accountParams, tasksParams } from '@/tests/mocks'
import { AddTasksController } from '@/application/controllers/tasks'
import { Controller } from '@/application/controllers/controller'
import { NotFoundError } from '@/domain/errors'

describe('AddTasksController', () => {
  let sut: AddTasksController

  const addTasks = jest.fn()

  const { id: accountId } = accountParams
  const { title, description } = tasksParams

  beforeEach(() => {
    sut = new AddTasksController(addTasks)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call addTasks with correct values', async () => {
    await sut.perform({ accountId, title, description })

    expect(addTasks).toHaveBeenCalledWith({ accountId, title, description })
    expect(addTasks).toHaveBeenCalledTimes(1)
  })

  it('should return notFound if addTasks return NotFoundError', async () => {
    addTasks.mockRejectedValueOnce(new NotFoundError('accountId'))
    const { statusCode, data } = await sut.handle({ accountId, title, description })

    expect(statusCode).toBe(404)
    expect(data).toEqual(new NotFoundError('accountId'))
  })

  it('should return noContent on success', async () => {
    const { statusCode, data } = await sut.perform({ accountId, title, description })

    expect(statusCode).toBe(204)
    expect(data).toBeNull()
  })
})
