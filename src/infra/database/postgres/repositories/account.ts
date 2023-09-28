import { type CheckAccountByEmail, type AddAccountRepository, type LoadAccountByEmail } from '@/domain/contracts/database/repositories/account'
import prisma from '@/infra/database/postgres/helpers/connection'

export class AccountRepository implements CheckAccountByEmail, AddAccountRepository, LoadAccountByEmail {
  async checkByEmail ({ email }: CheckAccountByEmail.Input): Promise<CheckAccountByEmail.Output> {
    const isValid = await prisma.user.findFirst({ where: { email } })

    return isValid != null
  }

  async create ({ email, name, password }: AddAccountRepository.Input): Promise<AddAccountRepository.Output> {
    await prisma.user.create({ data: { email, name, password } })
  }

  async loadByEmail ({ email }: LoadAccountByEmail.Input): Promise<LoadAccountByEmail.Output> {
    const account = await prisma.user.findFirst({ where: { email } })
    return account ?? undefined
  }
}
