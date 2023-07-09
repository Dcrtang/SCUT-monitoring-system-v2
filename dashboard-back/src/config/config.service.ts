import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { ConfigService as GlobalConfigService } from '@nestjs/config';
import { Config, defaultConfig } from './entities/config.entity';

@Injectable()
export class ConfigService {
  constructor(private readonly globalConfigService: GlobalConfigService) {}
  async getConfig() {
    const dataPath = this.globalConfigService.get<string>('DATA_PATH');
    try {
      const file = await fs.readFile(`${dataPath}/config.json`);
      return JSON.parse(String(file)) as Config;
    } catch {
      return defaultConfig;
    }
  }

  async update(config: Partial<Config>) {
    const dataPath = this.globalConfigService.get<string>('DATA_PATH');
    let originalConfig: Config | undefined;
    try {
      const file = await fs.readFile(`${dataPath}/config.json`);
      originalConfig = JSON.parse(String(file)) as Config;
    } catch {
      originalConfig = defaultConfig;
    }
    await fs.writeFile(
      `${dataPath}/config.json`,
      JSON.stringify({
        ...originalConfig,
        ...config,
      }),
    );
  }
}
