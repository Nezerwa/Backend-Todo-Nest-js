import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './category.repository';
import { CategoryDto } from './dto/category-dto';

@Injectable()
export class CategoryService {
  constructor(public categoryRepo: CategoriesRepository) {}
  findAll() {
    return this.categoryRepo.findAll();
  }
  findOne(id: string) {
    return this.categoryRepo.findOne(id);
  }
  create(category: CategoryDto) {
    return this.categoryRepo.createCategory(category);
  }
  async delete(id: string) {
    return await this.categoryRepo.deleteCategory(id);
  }
}
