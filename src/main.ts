import './main/config/module-alias'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './main/app.module'
import prisma from '@/infra/database/postgres/helpers/connection'
import { ValidationPipe } from '@nestjs/common'
import { setupSwagger } from './main/docs/swagger'

prisma.$connect().then(() => {
  NestFactory.create(AppModule).then(async app => {
    app.useGlobalPipes(new ValidationPipe())
    setupSwagger(app)
    await app.listen(3000)
  }).catch(error => { console.log(error) })
}).catch(error => { console.log(error) })
