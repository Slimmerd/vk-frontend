import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from '../auth/auth.guard';
import { FriendDataDto } from './dto/friendData.dto';

@Controller('friends')
export class FriendsController {
  constructor(private friendService: FriendsService) {}

  @Get('/recommendations')
  @UseGuards(AuthGuard)
  friendRecommendations(@Req() req) {
    return this.friendService.friendRecommendations(req.user.sub);
  }

  @Post('add')
  @UseGuards(AuthGuard)
  addFriend(@Body() addFriendData: FriendDataDto, @Req() req) {
    return this.friendService.addFriend(req.user.sub, addFriendData.friendID);
  }

  @Delete('remove')
  @UseGuards(AuthGuard)
  removeFriend(@Body() removeFriendData: FriendDataDto, @Req() req) {
    return this.friendService.removeFriend(
      req.user.sub,
      removeFriendData.friendID,
    );
  }
}
