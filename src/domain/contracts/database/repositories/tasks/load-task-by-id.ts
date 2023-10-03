export interface LoadTaskById {
  loadById: (input: LoadTaskById.Input) => Promise<LoadTaskById.Output>
}

export namespace LoadTaskById {
  export type Input = { id: string }
  export type Output = { title: string, description: string, completed: boolean, id: string } | undefined
}
