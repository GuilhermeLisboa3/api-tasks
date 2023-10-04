type Input = { accountId: string }
type Output = Array<{ title: string, description: string, completed: boolean, id: string }>
export type ListTasks = (input: Input) => Promise<Output>
