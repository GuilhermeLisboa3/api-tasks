import { accountParams, tasksParams } from '@/tests/mocks'
import { AddTasksController } from '@/application/controllers/tasks'
import { Controller } from '@/application/controllers/controller'

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
})
