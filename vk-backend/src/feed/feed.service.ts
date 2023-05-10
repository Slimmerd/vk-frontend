import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedService {
  constructor(private prismaService: PrismaService) {}

  async loadFeed(userID: number, skip: number = 0) {
    const feed = await this.prismaService.post.findMany({
      where: {
        author: {
          friends: {
            some: {
              id: userID,
            },
          },
        },
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        like: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: 15,
      skip: Number(skip),
    });

    return feed;
  }
}
