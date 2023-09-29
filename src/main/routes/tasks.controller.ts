import { AddTasksController } from '@/application/controllers/tasks'
import { nestResponseAdapter } from '@/main/adapters'
import { type HttpResponse } from '@/application/helpers'
import { AddTasksDto } from '@/main/routes/dto/tasks'
import { swaggerBadRequest, swaggerInternalServerError, swaggerNoContent, swaggerNotFound } from '@/main/docs/swagger/paths'

import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags, ApiNoContentResponse, ApiNotFoundResponse } from '@nestjs/swagger'

@ApiTags('tasks')
@Controller('')
export class TasksController {
  constructor (
    private readonly addTasks: AddTasksController
  ) {}

  @ApiNoContentResponse(swaggerNoContent())
  @ApiBadRequestResponse(swaggerBadRequest())
  @ApiNotFoundResponse(swaggerNotFound())
  @ApiInternalServerErrorResponse(swaggerInternalServerError())
  @Post('/add-tasks')
  async create (@Body() input: AddTasksDto, @Res() res): Promise<HttpResponse> {
    const response = await this.addTasks.handle(input)
    return await nestResponseAdapter(response, res)
  }
}
