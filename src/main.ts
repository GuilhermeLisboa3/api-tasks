import './main/config/module-alias'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './main/app.module'
import { prisma } from '@/infra/database/postgres/helpers'
import { ValidationPipe } from '@nestjs/common'

prisma.$connect().then(() => {
  NestFactory.create(AppModule).then(async app => {
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000)
  }).catch(error => { console.log(error) })
}).catch(error => { console.log(error) })
