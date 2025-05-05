import { Injectable } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';
import {
  CreateMessageDto,
  MessageDto,
  UpdateMessageDto,
} from '../dtos/messages';
import { PrismaService } from '../prisma.service';
import { Express } from 'express';
import supabase from '../supabase';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  findAll(): PrismaPromise<MessageDto[]> {
    return this.prisma.message.findMany({
      select: {
        id: true,
        content: true,
        isRead: true,
        File: {
          select: {
            id: true,
            fileUrl: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findOne(id: number): PrismaPromise<MessageDto | null> {
    return this.prisma.message.findUnique({
      where: { id },
      select: {
        id: true,
        content: true,
        isRead: true,
        File: {
          select: {
            id: true,
            fileUrl: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

create(
    data: CreateMessageDto,
    files: Array<Express.Multer.File>,
  ): PrismaPromise<MessageDto> {
    const fileUrls: string[] = [];
    if (files.length > 0) {
      try {
        files.map(async (file: Express.Multer.File) => {
          const { data, error } = await supabase.storage
            .from(
              this.configService.get<string>('SUPABASE_BUCLET_NAME')! +
                '/files',
            )
            .upload(`${uuidv4()}-${file.originalname}`, file.buffer, {
              cacheControl: '3600',
              upsert: true,
              contentType: file.mimetype,
            });
          if (data){
            fileUrls.push(`${this.configService.get<string>('SUPABASE_PROJET_URL')}/storage/v1/object/public/${data.fullPath}`)
          }
        });

      } catch (error) {
        console.log(error);
      }
    }
    return this.prisma.message.create({
      data: {
        content: data.content,
        owner: {
          connect: { id: data.ownerId },
        },
        File:{
          createMany:{
            data: fileUrls.map((fileUrl) => ({
              fileUrl,
            })),
          }
        }
      },
      select: {
        id: true,
        content: true,
        isRead: true,
        File: {
          select: {
            id: true,
            fileUrl: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  update(id: number, data: UpdateMessageDto): PrismaPromise<MessageDto> {
    return this.prisma.message.update({
      where: { id },
      data,
      select: {
        id: true,
        content: true,
        isRead: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  delete(id: number): PrismaPromise<MessageDto> {
    return this.prisma.message.delete({
      where: { id },
      select: {
        id: true,
        content: true,
        isRead: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
