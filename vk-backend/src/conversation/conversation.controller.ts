import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { AuthGuard } from '../auth/auth.guard';
import { ConvDataDto } from './dto/convData.dto';
import { StartConvDataDto } from './dto/startConvData.dto';
import { DeleteConvDataDto } from './dto/deleteConvData.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private convService: ConversationService) {}

  @Get('conversations')
  @UseGuards(AuthGuard)
  loadConversations(@Req() req) {
    return this.convService.loadConversations(req.user.sub);
  }

  @Get('conversation')
  @UseGuards(AuthGuard)
  loadConversation(@Body() convData: ConvDataDto) {
    return this.convService.loadConversation(convData.id, convData.skip);
  }

  @Post('start')
  @UseGuards(AuthGuard)
  startConversation(@Body() startConvData: StartConvDataDto, @Req() req) {
    return this.convService.startConversation(
      req.user.sub,
      startConvData.friendID,
    );
  }

  @Delete('delete')
  deleteConversation(@Body() convData: DeleteConvDataDto) {
    return this.convService.deleteConversation(convData.id);
  }
}
