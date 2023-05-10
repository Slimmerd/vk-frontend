import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserByIdDataDto } from './dto/userByIdData.dto';
import { UserByNameDataDto } from './dto/userByNameData.dto';
import { UserRegisterDataDto } from './dto/userRegisterData.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req) {
    return this.userService.findById(req.user.sub);
  }

  @Get('byId/:id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    const _id = parseInt(id) || 0;
    if (_id == 0) {
      throw new BadRequestException('Parameter should be number');
    }

    return this.userService.findById(_id);
  }

  @Get('byName/:name')
  @UseGuards(AuthGuard)
  findByName(@Param('name') userByNameData: UserByNameDataDto) {
    return this.userService.findByName(userByNameData.name);
  }

  @Post('register')
  register(@Body() userRegisterData: UserRegisterDataDto) {
    return this.userService.register(userRegisterData);
  }
}
