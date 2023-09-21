import { SchemaError } from '@/main/docs/swagger/shemmas'
import { getSchemaPath } from '@nestjs/swagger'

export const swaggerSignUpResponses = {
  created: {
    description: 'Created'
  },
  badRequest: {
    description: 'Bad Request',
    schema: {
      allOf: [{ $ref: getSchemaPath(SchemaError) }]
    }
  },
  internalServerError: {
    description: 'Server Error',
    schema: {
      allOf: [{ $ref: getSchemaPath(SchemaError) }]
    }
  }
}
