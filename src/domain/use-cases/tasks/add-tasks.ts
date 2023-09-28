import { type LoadAccountById } from '@/domain/contracts/database/repositories/account'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: LoadAccountById) => AddTasks
type Input = { accountId: string, title: string, description: string }
type Output = void
export type AddTasks = (input: Input) => Promise<Output>

export const addTasksUseCase: Setup = (accountRepository) => async ({ accountId, description, title }) => {
  const account = await accountRepository.loadById({ id: accountId })
  if (!account) throw new NotFoundError('accountId')
}
