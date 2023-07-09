import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/jwt.auth.guard';
import { FileService } from './file.service';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  getFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.saveFile(file);
  }
}
