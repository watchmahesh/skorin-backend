import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('settings')
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    slug: string;

    @Column({ nullable: true })
    logo: string;

    @Column({ nullable: true })
    siteDescription: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    fbLinks: string;

    @Column({ nullable: true })
    instaLinks: string;

    @Column({ nullable: true })
    mobileNumber: string;
}
