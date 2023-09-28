import { accountParams, tasksParams } from '@/tests/mocks/'
import { type LoadAccountById } from '@/domain/contracts/database/repositories/account'
import { type AddTasksRepository } from '@/domain/contracts/database/repositories/tasks'
import { type AddTasks, addTasksUseCase } from '@/domain/use-cases/tasks'
import { NotFoundError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddTasks', () => {
  let sut: AddTasks

  const { id: accountId, email, name, password } = accountParams
  const { title, description } = tasksParams

  const accountRepository = mock<LoadAccountById>()
  const tasksRepository = mock<AddTasksRepository>()

  beforeAll(() => {
    accountRepository.loadById.mockResolvedValue({ id: accountId, name, password, email })
  })

  beforeEach(() => {
    sut = addTasksUseCase(accountRepository, tasksRepository)
  })

  it('should call LoadAccountById with correct email', async () => {
    await sut({ accountId, title, description })

    expect(accountRepository.loadById).toHaveBeenCalledWith({ id: accountId })
    expect(accountRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should throw NotFoundError if LoadAccountById return undefined', async () => {
    accountRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut({ accountId, title, description })

    await expect(promise).rejects.toThrow(new NotFoundError('accountId'))
  })

  it('should call AddTasksRepository with correct values', async () => {
    await sut({ accountId, title, description })

    expect(tasksRepository.create).toHaveBeenCalledWith({ title, description, completed: false, accountId })
    expect(tasksRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should return on success', async () => {
    const result = await sut({ accountId, title, description })

    expect(result).toBeUndefined()
  })
})
