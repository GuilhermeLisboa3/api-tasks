import { type CheckAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { type HashGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountByEmail, hash: HashGenerator) => AddAccount
interface Input { name: string, email: string, password: string }
type Output = void
export type AddAccount = (input: Input) => Promise<Output>

export const addAccountUseCase: Setup = (accountRepository, hash) => async ({ name, email, password }) => {
  const emailExists = await accountRepository.checkByEmail({ email })
  if (emailExists) throw new FieldInUseError('email')
  await hash.generate({ plaintext: password })
}
