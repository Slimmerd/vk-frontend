import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Get('/:skip')
  @UseGuards(AuthGuard)
  loadFeed(@Param('skip') skip: string, @Req() req) {
    const _skip = parseInt(skip) | 0;

    return this.feedService.loadFeed(req.user.sub, _skip);
  }
}
