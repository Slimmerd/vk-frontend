import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { exclude } from '../user/user.helper';

@Injectable()
export class FriendsService {
  constructor(private prismaService: PrismaService) {}

  async friendRecommendations(userID: number) {
    const newFriends = await this.prismaService.user.findMany({
      where: {
        NOT: {
          friends: {
            some: { id: userID },
          },
        },
      },
      select: {
        id: true,
        name: true,
        // avatar_url: true
      },
      take: 30,
    });

    const friendsResponse = await newFriends.filter(
      (friend) => friend.id !== userID,
    );

    return friendsResponse;
  }

  async addFriend(userID: number, friendID: number) {
    const addUser = await this.prismaService.user.update({
      where: {
        id: userID,
      },
      data: {
        friends: { connect: { id: friendID } },
      },
      include: {
        friends: {
          select: {
            id: true,
            // avatar_url: true
            name: true,
          },
        },
      },
    });

    const updatedFriend = await this.prismaService.user.update({
      where: { id: friendID },
      data: {
        friends: { connect: { id: userID } },
      },
    });

    return addUser.friends;
  }

  async removeFriend(userID: number, removeID: number) {
    const removeFriend = await this.prismaService.user.update({
      where: {
        id: userID,
      },
      data: {
        friends: {
          disconnect: [{ id: removeID }],
        },
      },
      include: {
        friends: {
          select: {
            id: true,
            // avatar_url: true
            name: true,
          },
        },
      },
    });

    const updatedFriend = await this.prismaService.user.update({
      where: { id: removeID },
      data: {
        friends: { disconnect: { id: userID } },
      },
    });

    return removeFriend.friends;
  }
}
