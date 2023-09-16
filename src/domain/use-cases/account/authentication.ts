import { type LoadAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type TokenGenerator, type HashComparer } from '@/domain/contracts/gateways'
import { AuthenticationError } from '@/domain/errors'

type Setup = (accountRepository: LoadAccountByEmail, hash: HashComparer, token: TokenGenerator) => Authentication
type Input = { email: string, password: string }
type Output = void
export type Authentication = (input: Input) => Promise<Output>

export const authenticationUseCase: Setup = (accountRepository, hash, token) => async ({ email, password }) => {
  const account = await accountRepository.loadByEmail({ email })
  if (!account) throw new AuthenticationError()
  const isValid = await hash.compare({ plaintext: password, digest: account.password })
  if (!isValid) throw new AuthenticationError()
  await token.generate({ key: account.id })
}
