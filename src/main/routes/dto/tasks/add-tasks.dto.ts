import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AddTasksDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
    title: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
    description: string
}
