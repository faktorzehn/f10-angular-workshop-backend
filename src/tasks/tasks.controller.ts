import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiQuery({
    name: 'done',
    type: 'boolean',
    required: false,
  })
  @Get()
  getAll(@Query('done') done?: string): Task[] {
    return this.tasksService.getAll(parseToBooleanOrUndefined(done));
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.tasksService.getOne(id);
  }

  @Post()
  create(@Body() task: Task) {
    return this.tasksService.create(task);
  }

  @ApiBody({ type: Task })
  @Put('/:id')
  update(@Param('id') id: string, @Body() task: Task) {
    return this.tasksService.update(task);
  }

  @Put('/:id/done')
  done(@Param('id') id: string) {
    return this.tasksService.done(id);
  }
}

function parseToBooleanOrUndefined(b?: string): boolean | undefined {
  if (b === undefined) {
    return undefined;
  }

  if (b === 'true') {
    return true;
  }

  if (b === 'false') {
    return false;
  }

  throw new BadRequestException(
    `query parameter should be a boolean but was:${b}`,
  );
}
