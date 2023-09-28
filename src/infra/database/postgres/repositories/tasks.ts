import { type AddTasksRepository } from '@/domain/contracts/database/repositories/tasks'
import prisma from '@/infra/database/postgres/helpers/connection'

export class TasksRepository implements AddTasksRepository {
  async create ({ accountId, completed, description, title }: AddTasksRepository.Input): Promise<AddTasksRepository.Output> {
    await prisma.task.create({ data: { userId: accountId, completed, description, title } })
  }
}
