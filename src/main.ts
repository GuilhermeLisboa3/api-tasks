import './main/config/module-alias'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './main/app.module'
import { prisma } from '@/infra/database/postgres/helpers'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { config } from './main/docs/swagger'
import { SchemaError } from './main/docs/swagger/shemmas'

prisma.$connect().then(() => {
  NestFactory.create(AppModule).then(async app => {
    app.useGlobalPipes(new ValidationPipe())
    const document = SwaggerModule.createDocument(app, config, { extraModels: [SchemaError] })
    SwaggerModule.setup('api', app, document)
    await app.listen(3000)
  }).catch(error => { console.log(error) })
}).catch(error => { console.log(error) })
