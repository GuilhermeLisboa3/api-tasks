export interface AddTasksRepository {
  create: (input: AddTasksRepository.Input) => Promise<AddTasksRepository.Output>
}

export namespace AddTasksRepository {
  export type Input = { title: string, description: string, completed: boolean }
  export type Output = void
}
