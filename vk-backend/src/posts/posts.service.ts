import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDataDto } from './dto/createPostData.dto';
import { exclude } from '../user/user.helper';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async loadPostsById(userID: number, skip: number = 0) {
    const posts = await this.prismaService.post.findMany({
      where: {
        authorId: userID,
      },
      include: {
        like: {
          select: {
            id: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            // avatar_url: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: 20,
      skip: skip,
    });

    return posts;
  }

  async createPost(authorID: number, postData: CreatePostDataDto) {
    const newPost = await this.prismaService.post.create({
      data: {
        content: postData.content,
        attachments: postData.attachments,
        author: {
          connect: {
            id: authorID,
          },
        },
      },
      include: {
        like: {
          select: {
            id: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            // avatar_url: true,
          },
        },
      },
    });

    return newPost;
  }

  async deletePost(postID: number) {
    const post = await this.prismaService.post.delete({
      where: {
        id: postID,
      },
    });

    return !!post;
  }

  async setLike(userID: number, postID: number) {
    const newLike = await this.prismaService.post.update({
      where: {
        id: postID,
      },
      data: {
        like: {
          connect: {
            id: userID,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        like: {
          select: {
            id: true,
          },
        },
      },
    });
    return newLike;
  }

  async removeLike(userID: number, postID: number) {
    const removeLike = await this.prismaService.post.update({
      where: {
        id: postID,
      },
      data: {
        like: {
          disconnect: {
            id: userID,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        like: {
          select: {
            id: true,
          },
        },
      },
    });

    return removeLike;
  }
}
