import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as fs from 'fs/promises';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}
  async saveFile(file: Express.Multer.File) {
    const fileName = `${uuid.v4()}.${file.originalname.split('.')[1]}`;
    const dataPath = this.configService.get<string>('DATA_PATH');
    const path = `${dataPath}/files/${fileName}`;
    await fs.writeFile(path, file.buffer);
    return fileName;
  }
}
