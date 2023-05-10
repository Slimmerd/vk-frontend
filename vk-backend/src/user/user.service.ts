import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { UserRegisterDataDto } from './dto/userRegisterData.dto';
import { exclude } from './user.helper';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findById(userID: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        posts: {
          orderBy: {
            date: 'desc',
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
        },
        friends: true,
      },
    });

    return exclude(user, ['password']);
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
      include: {
        posts: {
          orderBy: {
            date: 'desc',
          },
        },
        friends: true,
      },
    });

    return user;
  }

  async findByName(name: string) {
    const users = await this.prismaService.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return users;
  }

  async register(userData: UserRegisterDataDto) {
    const isExist = await this.findByEmail(userData.email);

    if (!!isExist) {
      throw new NotAcceptableException('Пользователь уже существует');
    }

    const _password = await argon2.hash(userData.password);

    const newUser = await this.prismaService.user.create({
      data: {
        email: userData.email,
        password: _password,
        name: userData.name,
        dob: new Date(userData.dob),
        edu: userData.edu,
        city: userData.city,
      },
    });

    return !!newUser;
  }
}
