import { SchemaError } from '@/main/docs/swagger/shemas'
import { getSchemaPath } from '@nestjs/swagger'

export const swaggerCreated = (): object => ({
  description: 'Created'
})

export const swaggerNoContent = (): object => ({
  description: 'NoContent'
})

export const swaggerOk = (schema: any): object => ({
  description: 'Ok',
  schema: {
    allOf: [{ $ref: getSchemaPath(schema) }]
  }
})

export const swaggerBadRequest = (): object => ({
  description: 'Bad Request',
  schema: {
    allOf: [{ $ref: getSchemaPath(SchemaError) }]
  }
})

export const swaggerNotFound = (): object => ({
  description: 'Not found',
  schema: {
    allOf: [{ $ref: getSchemaPath(SchemaError) }]
  }
})

export const swaggerInternalServerError = (): object => ({
  description: 'Bad Request',
  schema: {
    allOf: [{ $ref: getSchemaPath(SchemaError) }]
  }
})
