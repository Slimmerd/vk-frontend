import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MsgDataDto } from './dto/msgData.dto';

@Injectable()
export class MsgService {
  constructor(private prismaService: PrismaService) {}

  async sendMessage(msgData: MsgDataDto) {
    const conversation = await this.prismaService.conversation.update({
      where: {
        id: msgData.convID,
      },
      data: {
        messages: {
          create: {
            text: msgData.message,
            authorId: 1, //TODO FIX f
          },
        },
      },
    });

    return conversation;
  }
}
