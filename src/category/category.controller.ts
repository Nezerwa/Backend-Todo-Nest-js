import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @Post()
  createNewCategory(@Body() body: CategoryDto) {
    return this.categoryService.create(body);
  }
  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
