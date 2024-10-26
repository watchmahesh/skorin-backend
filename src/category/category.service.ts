import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';


@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }



    async getCostItem() {
        try {
            return this.categoryRepository.find();
        } catch (e) {
            console.log(e)
        };


    }

    async createItem(createItemDto: any): Promise<any> {
        try {
            const data = this.categoryRepository.create(createItemDto);
            return this.categoryRepository.save(data);
        } catch (error) {
            throw new Error('Invalid type value');
        }
    }



    async getAllItems(pageNumber: number, limit: number): Promise<any> {
        const offset = (pageNumber - 1) * limit;

        const [items, total] = await this.categoryRepository.findAndCount({
            order: {
                id: 'DESC',
            },
            skip: offset,
            take: limit,
        });

        return {
            items,
            total,
            pageNumber,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getItemById(id: number): Promise<any> {
        const item = await this.categoryRepository.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(` Item with ID ${id} not found`);
        }
        return item;
    }

    async updateItem(id: number, updateItemDto: any): Promise<any> {
        const item = await this.getItemById(id);
        Object.assign(item, updateItemDto);
        return this.categoryRepository.save(item);
    }

    async deleteItem(id: number): Promise<void> {
        const costItem = await this.getItemById(id);
        await this.categoryRepository.remove(costItem);
    }

}
