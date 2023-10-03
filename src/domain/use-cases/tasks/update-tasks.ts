import { type LoadTaskById } from '@/domain/contracts/database/repositories/tasks'

type Setup = (tasksRepository: LoadTaskById) => UpdateTasks
type Input = { id: string, title: string, description: string, completed: boolean }
type Output = void
export type UpdateTasks = (input: Input) => Promise<Output>

export const updateTasksUseCase: Setup = (tasksRepository) => async ({ description, title, completed, id }) => {
  await tasksRepository.loadById({ id })
}
