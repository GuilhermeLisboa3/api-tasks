import { type TokenGenerator, type TokenValidator } from '@/domain/contracts/gateways'

import * as jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return jwt.sign({ key }, this.secret, { expiresIn: '2d' })
  }

  async validate ({ token }: TokenValidator.Input): Promise<void> {
    jwt.verify(token, this.secret)
  }
}
