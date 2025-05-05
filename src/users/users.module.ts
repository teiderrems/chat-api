import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService,PrismaService,ConfigService],
  controllers: [UsersController],
  imports: [MulterModule,ConfigModule],
})
export class UsersModule {}
