import { type LoadAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type HashComparer } from '@/domain/contracts/gateways'
import { AuthenticationError } from '@/domain/errors'

type Setup = (accountRepository: LoadAccountByEmail, hash: HashComparer) => Authentication
type Input = { email: string, password: string }
type Output = void
export type Authentication = (input: Input) => Promise<Output>

export const authenticationUseCase: Setup = (accountRepository, hash) => async ({ email, password }) => {
  const account = await accountRepository.loadByEmail({ email })
  if (!account) throw new AuthenticationError()
  await hash.compare({ plaintext: password, digest: account.password })
}
