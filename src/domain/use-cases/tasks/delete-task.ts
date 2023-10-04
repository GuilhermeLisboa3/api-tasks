import { type LoadTaskById, type DeleteTaskRepository } from '@/domain/contracts/database/repositories/tasks'
import { NotFoundError } from '@/domain/errors'

type Setup = (tasksRepository: LoadTaskById & DeleteTaskRepository) => DeleteTask
type Input = { id: string }
type Output = void
export type DeleteTask = (input: Input) => Promise<Output>

export const deleteTaskUseCase: Setup = (tasksRepository) => async ({ id }) => {
  const task = await tasksRepository.loadById({ id })
  if (!task) throw new NotFoundError('id')
  await tasksRepository.delete({ id })
}
