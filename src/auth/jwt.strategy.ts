import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'yourSecretKey',
    });
  }

  async validate(payload: any) {
    const user = await this.adminService.findOne(payload?.user?.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
