import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class SignUpDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
    name: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
    email: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
    password: string
}
