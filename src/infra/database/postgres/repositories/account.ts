import { type CheckAccountByEmail } from '@/domain/contracts/database/repositories/account'
import { prisma } from '@/infra/database/postgres/helpers'

export class AccountRepository implements CheckAccountByEmail {
  async checkByEmail ({ email }: CheckAccountByEmail.Input): Promise<CheckAccountByEmail.Output> {
    const isValid = await prisma.user.findFirst({ where: { email } })

    return isValid != null
  }
}
