import { type LoadAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { AuthenticationError } from '@/domain/errors'

type Setup = (accountRepository: LoadAccountByEmail) => Authentication
type Input = { email: string, password: string }
type Output = void
export type Authentication = (input: Input) => Promise<Output>

export const authenticationUseCase: Setup = (accountRepository) => async ({ email, password }) => {
  const account = await accountRepository.loadByEmail({ email })
  if (!account) throw new AuthenticationError()
}
