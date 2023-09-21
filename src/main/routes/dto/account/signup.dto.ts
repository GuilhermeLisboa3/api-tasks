import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
    name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
    email: string

  @IsString()
  @IsNotEmpty()
    password: string
}
