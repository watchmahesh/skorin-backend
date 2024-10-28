import { Controller, Post, Body, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './jwtAuthGuard';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    try {
      let result;
      if (body.refreshToken) {
        result = await this.authService.refreshAccessToken(body.refreshToken);
      } else {
        result = await this.authService.login(body.email, body.password);
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const resetToken = await this.authService.generatePasswordResetToken(email);

    // You need to send this token to the user's email using a mailing service
    // await this.authService.sendPasswordResetEmail(email, resetToken);

    return { message: 'Password reset email sent' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string
  ) {
    await this.authService.resetPassword(token, newPassword);


  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProfile(@Request() req) {
    console.log
    return req.user;
  }
}
