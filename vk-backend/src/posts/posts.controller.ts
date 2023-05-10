import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PostsService } from './posts.service';
import { LoadPostsDataDto } from './dto/loadPostsData.dto';
import { CreatePostDataDto } from './dto/createPostData.dto';
import { PostDataIdDto } from './dto/postDataId.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  @UseGuards(AuthGuard)
  loadPostsById(@Body() loadPostsData: LoadPostsDataDto, @Req() req) {
    return this.postService.loadPostsById(
      loadPostsData.userID,
      loadPostsData.skip,
    );
  }

  @Post('create')
  @UseGuards(AuthGuard)
  createPost(@Body() createPostData: CreatePostDataDto, @Req() req) {
    return this.postService.createPost(req.user.sub, createPostData);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  deletePost(@Body() deletePostData: PostDataIdDto) {
    return this.postService.deletePost(deletePostData.id);
  }

  @Put('setLike')
  @UseGuards(AuthGuard)
  setLike(@Body() setLikeData: PostDataIdDto, @Req() req) {
    return this.postService.setLike(req.user.sub, setLikeData.id);
  }

  @Delete('removeLike')
  @UseGuards(AuthGuard)
  removeLike(@Body() removeLikeData: PostDataIdDto, @Req() req) {
    return this.postService.removeLike(req.user.sub, removeLikeData.id);
  }
}
