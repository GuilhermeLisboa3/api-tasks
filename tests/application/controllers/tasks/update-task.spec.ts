import { tasksParams } from '@/tests/mocks'
import { UpdateTaskController } from '@/application/controllers/tasks'

describe('UpdateTaskController', () => {
  let sut: UpdateTaskController

  const updateTask = jest.fn()

  const { title, description, id } = tasksParams

  beforeEach(() => {
    sut = new UpdateTaskController(updateTask)
  })

  it('should call updateTask with correct values', async () => {
    await sut.perform({ id, title, description })

    expect(updateTask).toHaveBeenCalledWith({ id, title, description })
    expect(updateTask).toHaveBeenCalledTimes(1)
  })
})
