import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    try {
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      console.log(user);

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
