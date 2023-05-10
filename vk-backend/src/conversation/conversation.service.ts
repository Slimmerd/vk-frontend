import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prismaService: PrismaService) {}

  async loadConversations(userID: number) {
    const conversation = await this.prismaService.conversation.findMany({
      where: {
        memebers: {
          some: {
            id: userID,
          },
        },
      },
      include: {
        messages: {
          take: 1,
        },
      },
    });

    return conversation;
  }

  async loadConversation(conversationID: number, skip: number = 0) {
    const conversation = await this.prismaService.conversation.findUnique({
      where: {
        id: conversationID,
      },
      include: {
        messages: {
          skip: skip,
          take: 100,
        },
      },
    });

    return conversation;
  }

  async startConversation(userID: number, friendID: number) {
    const conversation = await this.prismaService.conversation.create({
      data: {
        memebers: {
          connect: [{ id: userID }, { id: friendID }],
        },
      },
      include: {
        messages: true,
      },
    });
  }

  async deleteConversation(conversationID: number) {
    const conversation = await this.prismaService.conversation.delete({
      where: {
        id: conversationID,
      },
    });

    return !!conversation;
  }
}
