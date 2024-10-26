import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { SettingsService } from './setting.service';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Get(':slug')
    async getSettings(@Param('slug') slug: string) {
        return this.settingsService.getSettings(slug);
    }

    // Endpoint to create or update settings
    @Post(':slug')
    async upsertSettings(@Param('slug') slug: string, @Body() createSettingsDto: any) {
        return this.settingsService.upsertSettings(slug, createSettingsDto);
    }
}
