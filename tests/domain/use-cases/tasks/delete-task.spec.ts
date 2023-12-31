import { tasksParams } from '@/tests/mocks/'
import { type DeleteTaskRepository, type LoadTaskById } from '@/domain/contracts/database/repositories/tasks'
import { type DeleteTask, deleteTaskUseCase } from '@/domain/use-cases/tasks'
import { NotFoundError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('DeleteTask', () => {
  let sut: DeleteTask

  const { title, description, id, completed } = tasksParams

  const tasksRepository = mock<LoadTaskById & DeleteTaskRepository>()

  beforeAll(() => {
    tasksRepository.loadById.mockResolvedValue({ title, description, id, completed })
  })

  beforeEach(() => {
    sut = deleteTaskUseCase(tasksRepository)
  })

  it('should call LoadTaskById with correct id', async () => {
    await sut({ id })

    expect(tasksRepository.loadById).toHaveBeenCalledWith({ id })
    expect(tasksRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should throw NotFoundError if LoadTaskById return undefined', async () => {
    tasksRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new NotFoundError('id'))
  })

  it('should call DeleteTaskRepository with correct id', async () => {
    await sut({ id })

    expect(tasksRepository.delete).toHaveBeenCalledWith({ id })
    expect(tasksRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('should return undefined on success', async () => {
    const result = await sut({ id })

    expect(result).toBeUndefined()
  })
})
