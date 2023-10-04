import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator'

export class UpdateTaskDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
    id: string

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @MinLength(5)
    title: string

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
    description: string

  @ApiProperty({ type: Boolean })
  @IsOptional()
  @IsBoolean()
    completed: boolean
}
