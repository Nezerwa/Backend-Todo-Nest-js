import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './Dto/create-task-dto';

@Controller('tasks')
export class TaskController {
  constructor(private tasksService: TaskService) {}
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }
  @Post()
  createNewTask(@Body() body: TaskDto) {
    return this.tasksService.create(body);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
