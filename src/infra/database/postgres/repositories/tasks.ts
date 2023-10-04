import { type AddTasksRepository, type LoadTaskById, type UpdateTaskRepository, type ListTasksRepository } from '@/domain/contracts/database/repositories/tasks'
import prisma from '@/infra/database/postgres/helpers/connection'

export class TasksRepository implements AddTasksRepository, LoadTaskById, UpdateTaskRepository, ListTasksRepository {
  async create ({ accountId, completed, description, title }: AddTasksRepository.Input): Promise<AddTasksRepository.Output> {
    await prisma.task.create({ data: { userId: accountId, completed, description, title } })
  }

  async loadById ({ id }: LoadTaskById.Input): Promise<LoadTaskById.Output> {
    const task = await prisma.task.findFirst({ where: { id } })
    return task ?? undefined
  }

  async update ({ id, completed, description, title }: UpdateTaskRepository.Input): Promise<UpdateTaskRepository.Output> {
    await prisma.task.update({ where: { id }, data: { completed, description, title } })
  }

  async list ({ accountId }: ListTasksRepository.Input): Promise<ListTasksRepository.Output> {
    const tasks = await prisma.task.findMany({ where: { userId: accountId } })
    return tasks.map(task => ({ id: task.id, title: task.title, description: task.description, completed: task.completed }))
  }
}
