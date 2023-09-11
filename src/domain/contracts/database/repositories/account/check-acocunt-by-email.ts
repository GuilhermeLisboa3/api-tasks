export interface CheckAccountByEmail {
  checkByEmail: (input: CheckAccountByEmail.Input) => Promise<CheckAccountByEmail.Output>
}

export namespace CheckAccountByEmail {
  export type Input = { email: string }
  export type Output = boolean
}
