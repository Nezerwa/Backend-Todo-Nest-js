import { TaskStatus } from './task-status';
export class TaskEntity {
  title: string;
  description: string;
  status: TaskStatus;
  categoryId: string;
}
