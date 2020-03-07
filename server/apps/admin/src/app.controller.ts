import {
  Controller,
  Get,
  UseInterceptors,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file')) //使用上传拦截器，取到前端上传的文件名
  async upload(@UploadedFile('file') file) {
    return file;
    // return {
    //   url: `http://localhost:3000/uploads/${file.filename}`,
    // };
  }
}
