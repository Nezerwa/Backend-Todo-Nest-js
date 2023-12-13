import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from './task-status';
import { TaskDto } from './Dto/create-task-dto';

@Injectable()
export class TasksRepository {
  private db: JsonDB;
  constructor() {
    this.db = new JsonDB(new Config('jsonDB.json', true, true, '/'));
  }
  findAll() {
    return this.db.getData('/tasks');
  }

  async findOne(id: string) {
    const task = await this.db.find('/tasks', (task) => task.id === id);
    if (!task) {
      throw new NotFoundException(
        `we can not find the task with this id ${id}`,
      );
    }
    return task;
  }
  async createTask(task: TaskDto) {
    const id: string = uuidv4();
    const newTask = { id, ...task, status: TaskStatus.OPEN };
    this.db.push('/tasks[]', newTask);
    return newTask;
  }
  async deleteTask(id: string) {
    try {
      const index = await this.db.getIndex('/tasks', id);
      if (index == -1) {
        throw new NotFoundException(
          `we can't find task with ${id} at this moment`,
        );
      }
      this.db.delete(`/tasks[${index}]`);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new ServiceUnavailableException(
        'Unable to delete your task for now',
      );
    }
  }
}
