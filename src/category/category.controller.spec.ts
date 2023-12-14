import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  // const mockCategoryService = {};
  const mockCategoryService = {
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };
  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = ['test'];
      mockCategoryService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('createNewCategory', () => {
    it('should return a new category', async () => {
      const dto = { name: 'test' };
      const result = { id: '1', ...dto };
      mockCategoryService.create.mockResolvedValue(result);

      expect(await controller.createNewCategory(dto)).toBe(result);
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const id = '1';
      const result = { affected: 1 };
      mockCategoryService.delete.mockResolvedValue(result);

      expect(await controller.deleteCategory(id)).toBe(result);
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
