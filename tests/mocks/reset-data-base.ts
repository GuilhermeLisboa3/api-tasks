import { prisma } from '@/infra/database/postgres/helpers'

export const resetDataBase = async (): Promise<void> => {
  await prisma.$queryRaw`DELETE FROM users`
}
