export interface UpdateTaskRepository {
  update: (input: UpdateTaskRepository.Input) => Promise<UpdateTaskRepository.Output>
}

export namespace UpdateTaskRepository {
  export type Input = { title?: string, description?: string, completed?: boolean, id: string }
  export type Output = void
}
