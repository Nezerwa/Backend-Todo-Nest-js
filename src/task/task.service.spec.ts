import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TasksRepository } from './tasks.repository';

describe('TaskService', () => {
  let service: TaskService;
  const mockTasksRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TasksRepository, useValue: mockTasksRepository },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = ['test'];
      mockTasksRepository.findAll.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a task', async () => {
      const id = '1';
      const result = {
        id,
        title: 'Test Task',
        description: 'This is a test task',
        categoryId: '1',
      };
      mockTasksRepository.findOne.mockResolvedValue(result);

      expect(await service.findOne(id)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a new task', async () => {
      const task = {
        title: 'Test Task',
        description: 'This is a test task',
        categoryId: '1',
      };
      const result = { id: '1', ...task };
      mockTasksRepository.createTask.mockResolvedValue(result);

      expect(await service.create(task)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const id = '1';
      const result = { affected: 1 };
      mockTasksRepository.deleteTask.mockResolvedValue(result);

      expect(await service.delete(id)).toBe(result);
    });
  });
});
