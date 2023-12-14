import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './Dto/create-task-dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('tasks')
export class TaskController {
  constructor(private tasksService: TaskService) {}
  @ApiOkResponse({ type: TaskDto, isArray: true })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
  @ApiOkResponse({ type: TaskDto })
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }
  @ApiCreatedResponse({ type: TaskDto })
  @Post()
  createNewTask(@Body() body: TaskDto) {
    return this.tasksService.create(body);
  }
  @ApiOkResponse()
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
