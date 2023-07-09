import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';

@Injectable()
export class ResetService {
  constructor(private readonly configService: ConfigService) {}
  async reset() {
    const dataPath = this.configService.get<string>('DATA_PATH');
    await fs.rm(dataPath + '/config.json', { force: true });
    await fs.rm(dataPath + '/files', { force: true, recursive: true });
    await fs.mkdir(dataPath + '/files', { recursive: true });
  }
}
