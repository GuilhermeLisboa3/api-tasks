import { tasksParams } from '@/tests/mocks/'
import { type LoadTaskById } from '@/domain/contracts/database/repositories/tasks'
import { type DeleteTask, deleteTaskUseCase } from '@/domain/use-cases/tasks'

import { mock } from 'jest-mock-extended'

describe('DeleteTask', () => {
  let sut: DeleteTask

  const { id } = tasksParams

  const tasksRepository = mock<LoadTaskById>()

  beforeEach(() => {
    sut = deleteTaskUseCase(tasksRepository)
  })

  it('should call LoadTaskById with correct id', async () => {
    await sut({ id })

    expect(tasksRepository.loadById).toHaveBeenCalledWith({ id })
    expect(tasksRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
