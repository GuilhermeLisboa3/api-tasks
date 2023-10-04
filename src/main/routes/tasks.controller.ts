import { AddTasksController, ListTasksController, UpdateTaskController } from '@/application/controllers/tasks'
import { nestResponseAdapter } from '@/main/adapters'
import { type HttpResponse } from '@/application/helpers'
import { AddTasksDto, UpdateTaskDto } from '@/main/routes/dto/tasks'
import { swaggerBadRequest, swaggerInternalServerError, swaggerNoContent, swaggerNotFound, swaggerOk } from '@/main/docs/swagger/paths'

import { Body, Controller, Post, Request, Res, Put, Get } from '@nestjs/common'
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags, ApiNoContentResponse, ApiNotFoundResponse, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'
import { TaskResponse } from '../docs/swagger/shemas/task'

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('')
export class TasksController {
  constructor (
    private readonly addTasks: AddTasksController,
    private readonly updateTask: UpdateTaskController,
    private readonly listTasks: ListTasksController
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

  @ApiOkResponse(swaggerOk(TaskResponse))
  @ApiInternalServerErrorResponse(swaggerInternalServerError())
  @Get('/list-tasks')
  async list (@Request() req, @Res() res): Promise<HttpResponse> {
    const response = await this.listTasks.handle({ ...req.user })
    return await nestResponseAdapter(response, res)
  }
}
