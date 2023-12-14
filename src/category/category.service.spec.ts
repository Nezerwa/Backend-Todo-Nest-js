import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoriesRepository } from './category.repository';

describe('CategoryService', () => {
  let service: CategoryService;
  const mockCategoriesRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    createCategory: jest.fn(),
    deleteCategory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: CategoriesRepository, useValue: mockCategoriesRepository },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = ['test'];
      mockCategoriesRepository.findAll.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const id = '1';
      const result = { id, name: 'Test Category' };
      mockCategoriesRepository.findOne.mockResolvedValue(result);

      expect(await service.findOne(id)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a new category', async () => {
      const category = { name: 'Test Category' };
      const result = { id: '1', ...category };
      mockCategoriesRepository.createCategory.mockResolvedValue(result);

      expect(await service.create(category)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const id = '1';
      const result = { affected: 1 };
      mockCategoriesRepository.deleteCategory.mockResolvedValue(result);

      expect(await service.delete(id)).toBe(result);
    });
  });
});
