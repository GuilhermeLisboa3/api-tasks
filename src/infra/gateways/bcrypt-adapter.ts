import { type HashGenerator } from '@/domain/contracts/gateways'

import * as bcrypt from 'bcrypt'

export class BcryptAdapter {
  async generate ({ plaintext }: HashGenerator.Input): Promise<void> {
    await bcrypt.hash(plaintext, 12)
  }
}
