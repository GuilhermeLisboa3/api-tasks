import { type CheckAccountByEmail } from '@/domain/contracts/database/repositories/account'

type Setup = (accountRepository: CheckAccountByEmail) => AddAccount
interface Input { name: string, email: string, password: string }
type Output = void
export type AddAccount = (input: Input) => Promise<Output>

export const addAccountUseCase: Setup = (accountRepository) => async ({ name, email, password }) => {
  await accountRepository.checkByEmail({ email })
}
