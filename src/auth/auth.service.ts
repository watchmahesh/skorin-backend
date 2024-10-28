import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interface/jwt-payload.interface';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await user.validatePassword(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload: JwtPayload = { email: email };

    // Create access and refresh tokens
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(user: User) {
    try {
      return this.usersService.create(user);
    } catch (e) {
      console.log(e)
      throw new Error(e.message)
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const accessToken = this.jwtService.sign({ sub: payload.sub });
      return {
        accessToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async generatePasswordResetToken(email: string): Promise<string> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return token;
  }

  // async sendPasswordResetEmail(email: string, token: string): Promise<void> {
  //   const resetUrl = `http://yourfrontendurl.com/reset-password?token=${token}`;

  //   // Example with Nodemailer
  //   const mailOptions = {
  //     to: email,
  //     subject: 'Password Reset Request',
  //     html: `Click <a href="${resetUrl}">here</a> to reset your password.`,
  //   };

  //   // Use your mail service to send this email
  //   await this.mailService.sendMail(mailOptions);
  // }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const decoded = this.jwtService.verify(token);
    const user = await this.usersService.findOneByEmail(decoded.email);

    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.usersService.update(user.email, { password: hashedPassword });
  }
}
