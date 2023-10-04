export interface DeleteTaskRepository {
  delete: (input: DeleteTaskRepository.Input) => Promise<DeleteTaskRepository.Output>
}

export namespace DeleteTaskRepository {
  export type Input = { id: string }
  export type Output = void
}
