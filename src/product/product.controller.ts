import { Controller, Post, Body, Get, Param, Put, Delete, Query, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, storageOptions } from 'src/utils/upload.helper';
import * as path from 'path';
import * as fs from 'fs';


@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: storageOptions('products'),
            fileFilter: imageFileFilter,
        }),
    )
    async createItem(
        @Body() requestBody: any,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const imageUrl = file ? `/uploads/product/${file.filename}` : null;
        return this.productService.createItem({ ...requestBody, imageUrl });
    }

    @Get()
    async getAllItems(@Query('pageNumber') pageNumber: number = 1, @Query('limit') limit: number = 8,
        @Query('keyword') keyword?: string,
    ) {
        return this.productService.getAllItems(pageNumber, limit,keyword);
    }

    @Put(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: storageOptions('products'),
            fileFilter: imageFileFilter,
        }),
    )
    async updateItem(
        @Param('id') id: number,
        @Body() updateItemDto: any,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const existingItem = await this.productService.getItemById(id);
        if (!existingItem) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }

        const imageUrl = file ? `/uploads/products/${file.filename}` : existingItem.imageUrl;

        if (file && existingItem.imageUrl) {
            const oldImagePath = path.join(__dirname, '..', '..', 'public', existingItem.imageUrl);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete old image: ${oldImagePath}`, err);
                }
            });
        }
        return this.productService.updateItem(id, { ...updateItemDto, imageUrl });
    }

    @Delete(':id')
    async deleteItem(@Param('id') id: number) {
        return this.productService.deleteItem(id);
    }
    @Get(':slug')
    async getItemById(@Param('slug') slug: string) {
        return this.productService.getItemBySlug(slug);
    }

}
