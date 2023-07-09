import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt.auth.guard';
import { ConfigService } from './config.service';
import { Config } from './entities/config.entity';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  findAll() {
    return this.configService.getConfig();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateConfigDto: Config) {
    return this.configService.update(updateConfigDto);
  }
}
