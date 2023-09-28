import { type LoadAccountById } from '@/domain/contracts/database/repositories/account'

type Setup = (accountRepository: LoadAccountById) => AddTasks
type Input = { accountId: string, title: string, description: string }
type Output = void
export type AddTasks = (input: Input) => Promise<Output>

export const addTasksUseCase: Setup = (accountRepository) => async ({ accountId, description, title }) => {
  await accountRepository.loadById({ id: accountId })
}
