import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ChatsService,PrismaService],
  controllers: [ChatsController]
})
export class ChatsModule {}
