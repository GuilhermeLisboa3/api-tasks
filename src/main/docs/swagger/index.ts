import { DocumentBuilder } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Tasks Api')
  .setDescription('Tasks api to add and remove tasks')
  .setVersion('1.0')
  .addTag('account')
  .build()
