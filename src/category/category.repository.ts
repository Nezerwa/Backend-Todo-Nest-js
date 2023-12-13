import {
  Injectable,
  NotFoundException,
  ConflictException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { CategoryEntity } from './category.entity';
import { v4 as uuidv4 } from 'uuid';
import { TaskDto } from 'src/task/Dto/create-task-dto';

@Injectable()
export class CategoriesRepository {
  private db: JsonDB;
  constructor() {
    this.db = new JsonDB(new Config('jsonDB.json', true, true, '/'));
  }
  findAll() {
    return this.db.getData('/categories');
  }
  async findOne(id: string) {
    const category = await this.db.find(
      '/categories',
      (category) => category.id === id,
    );
    if (!category) {
      throw new NotFoundException(`Unable to find category with id ${id}`);
    }
    return category;
  }
  async createCategory(category: CategoryEntity) {
    const id: string = uuidv4();
    const newCategory = { id, ...category };
    this.db.push('/categories[]', newCategory);
    return newCategory;
  }
  // async deleteCategory(id: string) {
  //   const index = await this.db.getIndex('/categories', id);
  //   if (index === -1) {
  //     throw new NotFoundException(
  //       `Unable to find category with ${id} at this moment`,
  //     );
  //   }
  //   const tasks = await this.db.getData('/tasks');
  //   const tasksInCategory = tasks.filter(
  //     (task: TaskDto) => task.categoryId === id,
  //   );
  //   if (tasksInCategory.length > 0) {
  //     throw new ConflictException(
  //       'Cannot delete category as there are tasks associated with it',
  //     );
  //   }
  //   this.db.delete(`/categories[${index}]`);
  // }
  async deleteCategory(id: string) {
    try {
      const index = await this.db.getIndex('/categories', id);
      if (index === -1) {
        throw new NotFoundException(
          `Unable to find category with ${id} at this moment`,
        );
      }
      const tasks = await this.db.getData('/tasks');
      const tasksInCategory = tasks.filter(
        (task: TaskDto) => task.categoryId === id,
      );

      if (tasksInCategory.length > 0) {
        throw new ConflictException(
          'Cannot delete category as there are tasks associated with it',
        );
      }
      // If no tasks are associated with the category, delete it
      this.db.delete(`/categories[${index}]`);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof ConflictException) throw error;
      throw new ServiceUnavailableException(
        'Unable to delete this category for now',
      );
    }
  }
}
