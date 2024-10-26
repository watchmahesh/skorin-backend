import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health/health.controller';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),

    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', '/public/uploads'),
        serveRoot: '/uploads/',
      },
    ),
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [
    AppController,
    HealthController,
  ],
  providers: [AppService],
})
export class AppModule { }
