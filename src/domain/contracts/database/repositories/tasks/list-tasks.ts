export interface ListTasksRepository {
  list: (input: ListTasksRepository.Input) => Promise<ListTasksRepository.Output>
}

export namespace ListTasksRepository {
  export type Input = { accountId: string }
  export type Output = Array<{ title: string, description: string, completed: boolean, id: string }>
}
