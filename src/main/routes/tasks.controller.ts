import { AddTasksController, UpdateTaskController } from '@/application/controllers/tasks'
import { nestResponseAdapter } from '@/main/adapters'
import { type HttpResponse } from '@/application/helpers'
import { AddTasksDto, UpdateTaskDto } from '@/main/routes/dto/tasks'
import { swaggerBadRequest, swaggerInternalServerError, swaggerNoContent, swaggerNotFound } from '@/main/docs/swagger/paths'

import { Body, Controller, Post, Request, Res, Put } from '@nestjs/common'
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags, ApiNoContentResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('')
export class TasksController {
  constructor (
    private readonly addTasks: AddTasksController,
    private readonly updateTask: UpdateTaskController
  ) {}

  @ApiNoContentResponse(swaggerNoContent())
  @ApiBadRequestResponse(swaggerBadRequest())
  @ApiNotFoundResponse(swaggerNotFound())
  @ApiInternalServerErrorResponse(swaggerInternalServerError())
  @Post('/add-tasks')
  async create (@Request() req, @Body() input: AddTasksDto, @Res() res): Promise<HttpResponse> {
    const response = await this.addTasks.handle({ ...input, ...req.user })
    return await nestResponseAdapter(response, res)
  }

  @ApiNoContentResponse(swaggerNoContent())
  @ApiBadRequestResponse(swaggerBadRequest())
  @ApiNotFoundResponse(swaggerNotFound())
  @ApiInternalServerErrorResponse(swaggerInternalServerError())
  @Put('/update-task')
  async update (@Request() req, @Body() input: UpdateTaskDto, @Res() res): Promise<HttpResponse> {
    const response = await this.updateTask.handle({ ...input, ...req.user })
    return await nestResponseAdapter(response, res)
  }
}
