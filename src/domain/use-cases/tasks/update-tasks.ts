import { type LoadTaskById, type UpdateTaskRepository } from '@/domain/contracts/database/repositories/tasks'
import { NotFoundError } from '@/domain/errors'

type Setup = (tasksRepository: LoadTaskById & UpdateTaskRepository) => UpdateTasks
type Input = { id: string, title?: string, description?: string, completed?: boolean }
type Output = void
export type UpdateTasks = (input: Input) => Promise<Output>

export const updateTasksUseCase: Setup = (tasksRepository) => async ({ description, title, completed, id }) => {
  const task = await tasksRepository.loadById({ id })
  if (!task) throw new NotFoundError('id')
  await tasksRepository.update({ description, title, completed, id })
}
