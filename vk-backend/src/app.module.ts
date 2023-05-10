import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FeedModule } from './feed/feed.module';
import { FriendsModule } from './friends/friends.module';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { MsgModule } from './msg/msg.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    FeedModule,
    FriendsModule,
    UserModule,
    ConversationModule,
    MsgModule,
    PrismaModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
