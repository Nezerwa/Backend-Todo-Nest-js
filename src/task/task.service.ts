import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { TaskDto } from './Dto/create-task-dto';

@Injectable()
export class TaskService {
  constructor(public taskRep: TasksRepository) {}
  findAll() {
    return this.taskRep.findAll();
  }
  findOne(id: string) {
    return this.taskRep.findOne(id);
  }
  create(Task: TaskDto) {
    return this.taskRep.createTask(Task);
  }
  delete(id: string) {
    return this.taskRep.deleteTask(id);
  }
}
