import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { LoginDataDto } from './dto/loginData.dto';
import { Response, Request } from 'express';
import { exclude } from '../user/user.helper';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginData: LoginDataDto, res: Response) {
    const user = await this.usersService.findByEmail(loginData.email);
    const passwordMatch = await argon2.verify(
      user.password,
      loginData.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };

    res.cookie('vkjwt', await this.jwtService.signAsync(payload), {
      secure: true,
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    }); // 7

    return exclude(user, ['password']);
  }

  async logout(res: Response) {
    return res.clearCookie('vkjwt');
  }
}
