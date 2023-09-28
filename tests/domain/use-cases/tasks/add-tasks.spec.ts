import { accountParams, tasksParams } from '@/tests/mocks/'
import { type LoadAccountById } from '@/domain/contracts/database/repositories/account'
import { type AddTasks, addTasksUseCase } from '@/domain/use-cases/tasks'

import { mock } from 'jest-mock-extended'

describe('AddTasks', () => {
  let sut: AddTasks

  const { id: accountId } = accountParams
  const { title, description } = tasksParams

  const accountRepository = mock<LoadAccountById>()

  beforeEach(() => {
    sut = addTasksUseCase(accountRepository)
  })

  it('should call LoadAccountById with correct email', async () => {
    await sut({ accountId, title, description })

    expect(accountRepository.loadById).toHaveBeenCalledWith({ id: accountId })
    expect(accountRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
