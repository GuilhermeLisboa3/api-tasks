import prisma from '@/infra/database/postgres/helpers/connection'

export const resetDataBase = async (): Promise<void> => {
  await prisma.$queryRaw`DELETE FROM tasks`
  await prisma.$queryRaw`DELETE FROM users`
}
