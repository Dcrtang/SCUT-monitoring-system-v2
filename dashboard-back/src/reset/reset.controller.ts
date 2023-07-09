import { Controller, Post, UseGuards } from '@nestjs/common';
import { ResetService } from './reset.service';
import { JwtAuthGuard } from 'src/jwt.auth.guard';

@Controller('reset')
@UseGuards(JwtAuthGuard)
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Post()
  create() {
    return this.resetService.reset();
  }
}
