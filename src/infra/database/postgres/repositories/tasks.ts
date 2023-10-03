import { type AddTasksRepository, type LoadTaskById } from '@/domain/contracts/database/repositories/tasks'
import prisma from '@/infra/database/postgres/helpers/connection'

export class TasksRepository implements AddTasksRepository, LoadTaskById {
  async create ({ accountId, completed, description, title }: AddTasksRepository.Input): Promise<AddTasksRepository.Output> {
    await prisma.task.create({ data: { userId: accountId, completed, description, title } })
  }

  async loadById ({ id }: LoadTaskById.Input): Promise<LoadTaskById.Output> {
    const task = await prisma.task.findFirst({ where: { id } })
    return task ?? undefined
  }
}
