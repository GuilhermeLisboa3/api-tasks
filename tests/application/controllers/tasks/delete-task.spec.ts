import { tasksParams } from '@/tests/mocks'
import { DeleteTaskController } from '@/application/controllers/tasks'

describe('DeleteTaskController', () => {
  let sut: DeleteTaskController

  const deleteTask = jest.fn()

  const { id } = tasksParams

  beforeEach(() => {
    sut = new DeleteTaskController(deleteTask)
  })

  it('should call deleteTask with correct values', async () => {
    await sut.perform({ id })

    expect(deleteTask).toHaveBeenCalledWith({ id })
    expect(deleteTask).toHaveBeenCalledTimes(1)
  })
})
