import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;
  const mockTaskService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = ['test'];
      mockTaskService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
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
      mockTaskService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
    });
  });

  describe('createNewTask', () => {
    it('should return a new task', async () => {
      const dto = {
        title: 'Test Task',
        description: 'This is a test task',
        categoryId: '1',
      };

      const result = { id: '1', ...dto };
      mockTaskService.create.mockResolvedValue(result);

      expect(await controller.createNewTask(dto)).toBe(result);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const id = '1';
      const result = { affected: 1 };
      mockTaskService.delete.mockResolvedValue(result);

      expect(await controller.deleteTask(id)).toBe(result);
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    })
      .overrideProvider(TaskService)
      .useValue(mockTaskService)
      .compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
