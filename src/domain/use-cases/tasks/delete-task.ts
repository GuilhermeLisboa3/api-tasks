import { type LoadTaskById } from '@/domain/contracts/database/repositories/tasks'

type Setup = (tasksRepository: LoadTaskById) => DeleteTask
type Input = { id: string }
type Output = void
export type DeleteTask = (input: Input) => Promise<Output>

export const deleteTaskUseCase: Setup = (tasksRepository) => async ({ id }) => {
  await tasksRepository.loadById({ id })
}
