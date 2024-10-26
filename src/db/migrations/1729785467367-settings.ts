import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Settings1729785467367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'settings',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                    name: 'slug',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'logo',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'siteDescription',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'address',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'fbLinks',
                    type: 'text',
                    isNullable: false,
                    comment: 'Stores JSON string for social media links',
                },
                {
                    name: 'instaLinks',
                    type: 'text',
                    isNullable: false,
                    comment: 'Stores JSON string for social media links',
                },
                {
                    name: 'mobileNumber',
                    type: 'varchar',
                    length: '20',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('settings');
    }
}
