import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoriesRepository } from './category.repository';

@Module({
  providers: [CategoryService, CategoriesRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
