export interface LoadAccountByEmail {
  loadByEmail: (input: LoadAccountByEmail.Input) => Promise<LoadAccountByEmail.Output>
}

export namespace LoadAccountByEmail {
  export type Input = { email: string }
  export type Output = { id: string, name: string, email: string, password: string } | undefined
}
