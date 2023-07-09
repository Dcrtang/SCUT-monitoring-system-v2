import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  login(loginDto: LoginDto) {
    const password = this.configService.get<string>('PASSWORD');
    if (password !== loginDto.password) throw new BadRequestException();
    return this.jwtService.sign({});
  }
}
