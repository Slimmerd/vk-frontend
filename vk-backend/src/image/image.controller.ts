import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';
import * as uuid from 'uuid';

@Controller('image')
export class ImageController {
  constructor(private imgService: ImageService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const fileExtension = path.extname(file.originalname);
          const randomName = uuid.v4();
          cb(null, `${randomName}${fileExtension}`);
        },
      }),
    }),
  )
  createImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.imgService.createImage(file);
  }

  @Get(':image')
  getImage(@Param('image') image, @Res() res: Response) {
    return this.imgService.getImage(res, image);
  }
}
