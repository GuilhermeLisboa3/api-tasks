import { tasksParams } from '@/tests/mocks/'
import { type LoadTaskById } from '@/domain/contracts/database/repositories/tasks'
import { type UpdateTasks, updateTasksUseCase } from '@/domain/use-cases/tasks'

import { mock } from 'jest-mock-extended'

describe('UpdateTasks', () => {
  let sut: UpdateTasks

  const { title, description, id, completed } = tasksParams

  const tasksRepository = mock<LoadTaskById>()

  beforeEach(() => {
    sut = updateTasksUseCase(tasksRepository)
  })

  it('should call LoadTaskById with correct id', async () => {
    await sut({ title, description, id, completed })

    expect(tasksRepository.loadById).toHaveBeenCalledWith({ id })
    expect(tasksRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
