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

    it('should return task on success', async () => {
      await prisma.task.create({ data: { title, description, completed, userId: id } })
      const result = await sut.loadById({ id })

      expect(result).toBeUndefined()
    })
  })

  describe('update()', () => {
    it('should return undefined on success update', async () => {
      await prisma.task.create({ data: { id, title, description, completed, userId: id } })

      await sut.update({ id, title: 'any_title' })

      const result = await prisma.task.findFirst({ where: { title: 'any_title' } })

      expect(result).toBeTruthy()
    })
  })
})
