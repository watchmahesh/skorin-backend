import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entity/setttings.entity';
import { SettingsService } from './setting.service';
import { SettingsController } from './setting.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Setting])],
    providers: [SettingsService],
    controllers: [SettingsController],
})
export class ProductModule {}
