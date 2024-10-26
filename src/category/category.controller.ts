import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async createItem(@Body() requestBody: any) {
        return this.categoryService.createItem(requestBody);
    }

    @Get()
    async getAllItems(@Query('pageNumber') pageNumber: number = 1, @Query('limit') limit: number = 8) {
        return this.categoryService.getAllItems(pageNumber, limit);
    }


    @Put(':id')
    async updateItem(@Param('id') id: number, @Body() updateItemDto: any) {
        return this.categoryService.updateItem(id, updateItemDto);
    }

    @Delete(':id')
    async deleteItem(@Param('id') id: number) {
        return this.categoryService.deleteItem(id);
    }

    @Get(':id')
    async getItemById(@Param('id') id: number) {
        return this.categoryService.getItemById(id);
    }

}
