import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
} from 'typeorm';
import { slugify } from 'src/utils/slugify';
import { Category } from 'src/category/entity/category.entity';
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ unique: true })
    slug: string;

    @ManyToOne(() => Category, (category) => category.products, {
        nullable: false,
        onDelete: 'CASCADE',
      })
      category: Category;

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
      if (this.name) {
        this.slug = slugify(this.name);
      }
    }


}
