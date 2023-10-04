import { ApiProperty } from '@nestjs/swagger'

export class TaskResponse {
  @ApiProperty()
    id: string

  @ApiProperty()
    title: string

  @ApiProperty()
    description: string

  @ApiProperty()
    completed: boolean
}
