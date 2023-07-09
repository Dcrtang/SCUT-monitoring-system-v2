import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/jwt.auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  check() {
    return 'ok';
  }
}
