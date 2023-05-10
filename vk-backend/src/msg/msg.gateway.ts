import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MsgService } from './msg.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { MsgDataDto } from './dto/msgData.dto';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MsgGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private msgService: MsgService) {}

  @WebSocketServer() server: Server;

  @UseGuards(AuthGuard)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() content: MsgDataDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const cookie = client.handshake.headers;
    console.log(cookie);
    const msg = await this.msgService.sendMessage(content);
    this.server.emit('recMessage', msg);
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Do stuffs
  }
}
