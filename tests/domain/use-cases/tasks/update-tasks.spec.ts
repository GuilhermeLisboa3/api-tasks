import { tasksParams } from '@/tests/mocks/'
import { type LoadTaskById, type UpdateTaskRepository } from '@/domain/contracts/database/repositories/tasks'
import { type UpdateTasks, updateTasksUseCase } from '@/domain/use-cases/tasks'
import { NotFoundError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('UpdateTasks', () => {
  let sut: UpdateTasks

  const { title, description, id, completed } = tasksParams

  const tasksRepository = mock<LoadTaskById & UpdateTaskRepository>()

  beforeAll(() => {
    tasksRepository.loadById.mockResolvedValue({ title, description, id, completed })
  })

  beforeEach(() => {
    sut = updateTasksUseCase(tasksRepository)
  })

  it('should call LoadTaskById with correct id', async () => {
    await sut({ title, description, id, completed })

    expect(tasksRepository.loadById).toHaveBeenCalledWith({ id })
    expect(tasksRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should throw NotFoundError if LoadTaskById return undefined', async () => {
    tasksRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut({ title, description, id, completed })

    await expect(promise).rejects.toThrow(new NotFoundError('id'))
  })

  it('should call UpdateTaskRepository with correct id', async () => {
    await sut({ title, description, id, completed })

    expect(tasksRepository.update).toHaveBeenCalledWith({ title, description, id, completed })
    expect(tasksRepository.update).toHaveBeenCalledTimes(1)
  })
})
