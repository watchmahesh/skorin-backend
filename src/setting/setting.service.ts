import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entity/setttings.entity';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Setting)
        private readonly settingsRepository: Repository<Setting>,
    ) {}

    // Create or update settings based on slug
    async upsertSettings(slug: string, createSettingsDto: any): Promise<any> {
        const existingSettings = await this.settingsRepository.findOne({ where: { slug } });

        if (existingSettings) {
            // Update the existing settings
            Object.assign(existingSettings, createSettingsDto);
            return this.settingsRepository.save(existingSettings);
        } else {
            // Create new settings
            const newSettings = this.settingsRepository.create({ slug, ...createSettingsDto });
            return this.settingsRepository.save(newSettings);
        }
    }

    async getSettings(slug: string): Promise<Setting> {
        const settings = await this.settingsRepository.findOne({ where: { slug } });
        if (!settings) {
            throw new NotFoundException('Settings not found');
        }
        return settings;
    }
}
