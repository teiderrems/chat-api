import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from '../prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [MessagesService, PrismaService, ConfigService],
  controllers: [MessagesController],
  imports: [ConfigModule,MulterModule],
})
export class MessagesModule {}
