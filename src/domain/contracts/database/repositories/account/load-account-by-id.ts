export interface LoadAccountById {
  loadById: (input: LoadAccountById.Input) => Promise<LoadAccountById.Output>
}

export namespace LoadAccountById {
  export type Input = { id: string }
  export type Output = { id: string, name: string, email: string, password: string } | undefined
}
