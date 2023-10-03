import { type LoadTaskById, type UpdateTaskRepository } from '@/domain/contracts/database/repositories/tasks'
import { NotFoundError } from '@/domain/errors'

type Setup = (tasksRepository: LoadTaskById & UpdateTaskRepository) => UpdateTask
type Input = { id: string, title?: string, description?: string, completed?: boolean }
type Output = void
export type UpdateTask = (input: Input) => Promise<Output>

export const updateTaskUseCase: Setup = (tasksRepository) => async ({ description, title, completed, id }) => {
  const task = await tasksRepository.loadById({ id })
  if (!task) throw new NotFoundError('id')
  await tasksRepository.update({ description, title, completed, id })
}
