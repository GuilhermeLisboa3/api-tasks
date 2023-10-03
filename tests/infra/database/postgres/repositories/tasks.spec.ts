import { TasksRepository } from '@/infra/database/postgres/repositories'
import { accountParams, resetDataBase, tasksParams } from '@/tests/mocks'
import prisma from '@/infra/database/postgres/helpers/connection'

describe('TasksRepository', () => {
  let sut: TasksRepository
  const { email, name, password, id } = accountParams
  const { title, description, completed } = tasksParams

  beforeEach(async () => {
    await resetDataBase()
    await prisma.user.create({ data: { name, id, password, email } })
    sut = new TasksRepository()
  })

  describe('create()', () => {
    it('should return undefined on success', async () => {
      const result = await sut.create({ title, description, completed, accountId: id })

      expect(result).toBeUndefined()
    })
  })

  describe('loadById()', () => {
    it('should return undefined if task does not exists', async () => {
      const result = await sut.loadById({ id })

      expect(result).toBeUndefined()
    })
  })
})
