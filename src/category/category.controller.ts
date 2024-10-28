import { Controller, Post, Body, Get, Param, Put, Delete, Query, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, storageOptions } from 'src/utils/upload.helper';
import path from 'path';
import * as fs from 'fs';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: storageOptions('category'),
            fileFilter: imageFileFilter,
        }),
    )
    async createItem(@Body() requestBody: any,
        @UploadedFile() file: Express.Multer.File,
    ) {

        const image = file ? `/uploads/category/${file.filename}` : null;
        return this.categoryService.createItem({ ...requestBody, image });
    }

    @Get()
    async getAllItems(@Query('pageNumber') pageNumber: number = 1, @Query('limit') limit: number = 8) {
        return this.categoryService.getAllItems(pageNumber, limit);
    }


    @Put(':id')
    async updateItem(@Param('id') id: number,
        @Body() updateItemDto: any,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const existingItem = await this.categoryService.getItemById(id);
        if (!existingItem) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }

        const image = file ? `/uploads/category/${file.filename}` : existingItem.image;

        if (file && existingItem.image) {
            const oldImagePath = path.join(__dirname, '..', '..', 'public', existingItem.image);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete old image: ${oldImagePath}`, err);
                }
            });
        }
        return this.categoryService.updateItem(id, { ...updateItemDto, image });
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
