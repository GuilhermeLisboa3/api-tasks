import { type TokenValidator } from '@/domain/contracts/gateways'
import { AuthenticationError, PermissionError } from '@/domain/errors'
import { type LoadAccountById } from '@/domain/contracts/database/repositories/account'

type Setup = (token: TokenValidator, accountRepository: LoadAccountById) => Authorize
type Input = { accessToken: string }
type Output = void
export type Authorize = (input: Input) => Promise<Output>

export const authorizeUseCase: Setup = (token, accountRepository) => async ({ accessToken }) => {
  let accountId: string
  try {
    accountId = await token.validate({ token: accessToken })
  } catch (error) { throw new AuthenticationError() }
  const account = await accountRepository.loadById({ id: accountId })
  if (!account) throw new PermissionError()
}
