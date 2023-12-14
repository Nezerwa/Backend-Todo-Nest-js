import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category-dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @ApiOkResponse({ type: CategoryDto, isArray: true })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @ApiCreatedResponse({ type: CategoryDto })
  @Post()
  createNewCategory(@Body() body: CategoryDto) {
    return this.categoryService.create(body);
  }
  @ApiOkResponse()
  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
