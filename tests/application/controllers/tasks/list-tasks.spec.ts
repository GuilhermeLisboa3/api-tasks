import { accountParams } from '@/tests/mocks'
import { ListTasksController } from '@/application/controllers/tasks'
import { Controller } from '@/application/controllers/controller'

describe('ListTasksController', () => {
  let sut: ListTasksController

  const listTasks = jest.fn()

  const { id: accountId } = accountParams

  beforeEach(() => {
    sut = new ListTasksController(listTasks)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call listTasks with correct values', async () => {
    await sut.perform({ accountId })

    expect(listTasks).toHaveBeenCalledWith({ accountId })
    expect(listTasks).toHaveBeenCalledTimes(1)
  })
})
