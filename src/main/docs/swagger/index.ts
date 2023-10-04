import { type INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SchemaError, LoginResponse } from './shemas'
import { TaskResponse } from './shemas/task'

export function setupSwagger (app: INestApplication): void {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Tasks Api')
    .setDescription('Tasks api to add and remove tasks')
    .setVersion('1.0')
    .addTag('account')
    .build()

  const document = SwaggerModule.createDocument(app, config, { extraModels: [SchemaError, LoginResponse, TaskResponse] })

  SwaggerModule.setup('api-docs', app, document)
}
