import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TasksRepository } from './tasks.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TasksRepository],
})
export class TaskModule {}
