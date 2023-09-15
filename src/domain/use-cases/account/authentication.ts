import { type LoadAccountByEmail } from '@/domain/contracts/database/repositories/account'

type Setup = (accountRepository: LoadAccountByEmail) => Authentication
type Input = { email: string, password: string }
type Output = void
export type Authentication = (input: Input) => Promise<Output>

export const authenticationUseCase: Setup = (accountRepository) => async ({ email, password }) => {
  await accountRepository.loadByEmail({ email })
}
