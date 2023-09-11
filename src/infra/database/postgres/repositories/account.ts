import { type CheckAccountByEmail, type AddAccountRepository } from '@/domain/contracts/database/repositories/account'
import { prisma } from '@/infra/database/postgres/helpers'

export class AccountRepository implements CheckAccountByEmail, AddAccountRepository {
  async checkByEmail ({ email }: CheckAccountByEmail.Input): Promise<CheckAccountByEmail.Output> {
    const isValid = await prisma.user.findFirst({ where: { email } })

    return isValid != null
  }

  async create ({ email, name, password }: AddAccountRepository.Input): Promise<AddAccountRepository.Output> {
    await prisma.user.create({ data: { email, name, password } })
  }
}
