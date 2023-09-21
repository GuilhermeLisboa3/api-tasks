import { ApiProperty } from '@nestjs/swagger'

export class SchemaError {
  @ApiProperty()
    error: string
}
