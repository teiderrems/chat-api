import { Injectable } from '@nestjs/common';
import { CreateChatDto, UpdateChatDto } from 'src/dtos/chats';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatsService {

    constructor(private readonly prismaService: PrismaService) {}
    async findAll(ownerId:number,name:string|null=null) {
        if (name){
          return this.prismaService.chat.findMany({
            where:{
              name,ownerId,
            },
            select:{
              id: true,
              name: true,
              createdAt: true,
              updatedAt: true
            }
          });
        }
      return this.prismaService.chat.findMany({
        where:{
          ownerId
        },
        select:{
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true
        }
      });
    }

    async findOne(id: number) {
        return this.prismaService.chat.findUnique({
            where: { id },
            select:{
                id: true,
                name: true,
                ChatUserMessage:{
                    select:{
                        message:{
                            select:{
                                id: true,
                                content: true,
                                createdAt: true,
                                updatedAt: true,
                                owner:{
                                    select:{
                                        id: true,
                                        firstName: true,
                                        email: true,
                                        lastName: true,
                                        profil: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    async create(data: CreateChatDto) {
        return this.prismaService.chat.create({
            data: {
                name: data.name,
                owner:{
                    connect:{
                        id: data.ownerId
                    }
                }
            },
            select:{
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    async update(id: number, data: UpdateChatDto) {
        return this.prismaService.chat.update({
            where: { id },
            data: {
                name: data.name
            },
            select:{
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
    
    async remove(id: number) {
        return this.prismaService.chat.delete({
            where: { id },
            select:{
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
}
