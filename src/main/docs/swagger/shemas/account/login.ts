import { ApiProperty } from '@nestjs/swagger'

export class LoginResponse {
  @ApiProperty()
    name: string

  @ApiProperty()
    accessToken: string
}
