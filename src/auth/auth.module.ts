import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'hello-test',
      signOptions: { expiresIn: '60m' },
    }),
  ],
   controllers: [AuthController],

  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
