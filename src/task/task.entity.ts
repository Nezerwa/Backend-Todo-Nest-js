enum TaskStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  OPEN = 'OPEN',
}
export class TaskEntity {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
