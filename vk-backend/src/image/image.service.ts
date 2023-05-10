import { Injectable, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Injectable()
export class ImageService {
  async createImage(@UploadedFile() file: Express.Multer.File) {
    return `${process.env.URL}/image/${file.filename}`;
  }

  async getImage(res: Response, image: string) {
    return res.sendFile(join(process.cwd(), 'uploads/' + image));
  }
}
