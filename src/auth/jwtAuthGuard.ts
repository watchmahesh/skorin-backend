import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        console.log(info)
        if (info && info.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Token has expired');
        }
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        return user;
      }
}
