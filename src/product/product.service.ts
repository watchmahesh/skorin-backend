import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';


@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }



    async getCostItem() {
        try {
            return this.productRepository.find();
        } catch (e) {
            console.log(e)
        };


    }

    async createItem(createItemDto: any): Promise<any> {
        try {
            const data = this.productRepository.create(createItemDto);
            return this.productRepository.save(data);
        } catch (error) {
            throw new Error('Invalid type value');
        }
    }



    async getAllItems(pageNumber: number, limit: number, keyword?: string): Promise<any> {
        const offset = (pageNumber - 1) * limit;

        // Get the base query builder with search conditions if provided
        const queryBuilder = this.buildSearchQuery(keyword);

        // Add pagination and sorting to the query
        const [items, total] = await queryBuilder
            .orderBy('product.id', 'DESC')
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return {
            items,
            total,
            pageNumber,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }


    async getItemById(id: number): Promise<any> {
        const item = await this.productRepository.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(` Item with ID ${id} not found`);
        }
        return item;
    }

    async updateItem(id: number, updateItemDto: any): Promise<any> {
        const item = await this.getItemById(id);
        Object.assign(item, updateItemDto);
        return this.productRepository.save(item);
    }

    async deleteItem(id: number): Promise<void> {
        const costItem = await this.getItemById(id);
        await this.productRepository.remove(costItem);
    }

    async getItemBySlug(slug: string): Promise<any> {
        const item = await this.productRepository.findOneBy({ slug });
        if (!item) {
            throw new NotFoundException(` Item with Slug ${slug} not found`);
        }
        return item;
    }

    private buildSearchQuery(keyword?: string) {
        const queryBuilder = this.productRepository.createQueryBuilder('product');

        if (keyword) {
            queryBuilder.where('product.name ILIKE :keyword OR product.description ILIKE :keyword', {
                keyword: `%${keyword}%`,
            });
        }

        return queryBuilder;
    }

}
