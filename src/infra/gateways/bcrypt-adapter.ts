import { type HashGenerator, type HashComparer } from '@/domain/contracts/gateways'

import * as bcrypt from 'bcrypt'

export class BcryptAdapter implements HashGenerator {
  async generate ({ plaintext }: HashGenerator.Input): Promise<HashGenerator.Output> {
    return await bcrypt.hash(plaintext, 12)
  }

  async compare ({ digest, plaintext }: HashComparer.Input): Promise<void> {
    await bcrypt.compare(plaintext, digest)
  }
}
