import { Module } from '@nestjs/common';
import { MsgController } from './msg.controller';
import { MsgService } from './msg.service';
import { MsgGateway } from './msg.gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MsgController],
  providers: [MsgService, MsgGateway],
})
export class MsgModule {}
