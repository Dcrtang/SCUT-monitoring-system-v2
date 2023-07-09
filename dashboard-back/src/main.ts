import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const filesPath = configService.get<string>('DATA_PATH') + '/files';
  try {
    fs.accessSync(filesPath, fs.constants.F_OK);
  } catch {
    fs.mkdirSync(filesPath, { recursive: true });
  }
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
