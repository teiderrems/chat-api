import { Injectable } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';
import { CreateGroupDto, GroupDto, UpdateGroupDto } from '../dtos/groups';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupsService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(name:string|null=null): PrismaPromise<GroupDto[]> {
      if (name){
        return this.prisma.group.findMany({
          where:{name},
          select: {
            id: true,
            name: true,
            chat:{
              select:{
                ChatUserMessage:{
                  select:{
                    message:{
                      select:{
                        content: true,
                        isRead: true,
                        File:{
                          select: {
                            id: true,
                            fileUrl: true,
                          },
                        },
                        owner:{
                          select:{
                            firstName: true,
                            lastName: true,
                            profil: true,
                          }
                        },
                        createdAt: true,
                        updatedAt: true,
                      }
                    }
                  }
                }
              }
            },
            description: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      }
        return this.prisma.group.findMany({
            select: {
                id: true,
                name: true,
                chat:{
                    select:{
                        ChatUserMessage:{
                            select:{
                                message:{
                                    select:{
                                        content: true,
                                        isRead: true,
                                        File:{
                                            select: {
                                                id: true,
                                                fileUrl: true,
                                            },
                                        },
                                        owner:{
                                            select:{
                                                firstName: true,
                                                lastName: true,
                                                profil: true,
                                            }
                                        },
                                        createdAt: true,
                                        updatedAt: true,
                                    }
                                }
                            }
                        }
                    }
                },
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    findOne(id: number): PrismaPromise<GroupDto | null> {
        return this.prisma.group.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                chat:{
                    select:{
                        ChatUserMessage:{
                            select:{
                                message:{
                                    select:{
                                        content: true,
                                        isRead: true,
                                        File:{
                                            select: {
                                                id: true,
                                                fileUrl: true,
                                            },
                                        },
                                        owner:{
                                            select:{
                                                firstName: true,
                                                lastName: true,
                                                profil: true,
                                            }
                                        },
                                        createdAt: true,
                                        updatedAt: true,
                                    }
                                }
                            }
                        }
                    }
                },
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    create(data: CreateGroupDto): PrismaPromise<GroupDto> {

        return this.prisma.group.create({
            data:{
                name: data.name,
                description: data.description,
                chat:{
                    create:{
                        name: data.name,
                        owner:{
                            connect: { id: data.ownerId },
                        }
                    }
                },
                UserGroup:{
                    create:{
                        member:{
                            connect: { id: data.ownerId },
                        }
                    }
                }
            },
            select: {
                id: true,
                name: true,
                chat:{
                    select:{
                        ChatUserMessage:{
                            select:{
                                message:{
                                    select:{
                                        content: true,
                                        isRead: true,
                                        File:{
                                            select: {
                                                id: true,
                                                fileUrl: true,
                                            },
                                        },
                                        owner:{
                                            select:{
                                                firstName: true,
                                                lastName: true,
                                                profil: true,
                                            }
                                        },
                                        createdAt: true,
                                        updatedAt: true,
                                    }
                                }
                            }
                        }
                    }
                },
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    update(id: number, data: UpdateGroupDto): PrismaPromise<GroupDto> {
        return this.prisma.group.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                chat:{
                    select:{
                        ChatUserMessage:{
                            select:{
                                message:{
                                    select:{
                                        content: true,
                                        isRead: true,
                                        File:{
                                            select: {
                                                id: true,
                                                fileUrl: true,
                                            },
                                        },
                                        owner:{
                                            select:{
                                                firstName: true,
                                                lastName: true,
                                                profil: true,
                                            }
                                        },
                                        createdAt: true,
                                        updatedAt: true,
                                    }
                                }
                            }
                        }
                    }
                },
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    addUser(id: number, userId: number): PrismaPromise<GroupDto> {
        return this.prisma.group.update({
            where: { id },
            data: {
                UserGroup:{
                    create:{
                        member:{
                            connect: { id: userId },
                        }
                    }
                }
            },
            select: {
                id: true,
                name: true,
                chat:{
                    select:{
                        ChatUserMessage:{
                            select:{
                                message:{
                                    select:{
                                        content: true,
                                        isRead: true,
                                        File:{
                                            select: {
                                                id: true,
                                                fileUrl: true,
                                            },
                                        },
                                        owner:{
                                            select:{
                                                firstName: true,
                                                lastName: true,
                                                profil: true,
                                            }
                                        },
                                        createdAt: true,
                                        updatedAt: true,
                                    }
                                }
                            }
                        }
                    }
                },
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    addManyUser(id: number, userIds: number[]): PrismaPromise<GroupDto> {
        return this.prisma.group.update({
            where: { id },
            data: {
                UserGroup:{
                    createMany:{
                        data: userIds.map((userId) => ({
                            memberId: userId,
                        })),
                    }
                }
            },
            select: {
                id: true,
                name: true,
                chat:{
                    select:{
                        ChatUserMessage:{
                            select:{
                                message:{
                                    select:{
                                        content: true,
                                        isRead: true,
                                        File:{
                                            select: {
                                                id: true,
                                                fileUrl: true,
                                            },
                                        },
                                        owner:{
                                            select:{
                                                firstName: true,
                                                lastName: true,
                                                profil: true,
                                            }
                                        },
                                        createdAt: true,
                                        updatedAt: true,
                                    }
                                }
                            }
                        }
                    }
                },
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    delete(id: number): PrismaPromise<GroupDto> {
        return this.prisma.group.delete({
            where: { id },
            select: {
                id: true,
                name: true,
                chat:{
                    select:{
                        ChatUserMessage:{
                            select:{
                                message:{
                                    select:{
                                        content: true,
                                        isRead: true,
                                        File:{
                                            select: {
                                                id: true,
                                                fileUrl: true,
                                            },
                                        },
                                        owner:{
                                            select:{
                                                firstName: true,
                                                lastName: true,
                                                profil: true,
                                            }
                                        },
                                        createdAt: true,
                                        updatedAt: true,
                                    }
                                }
                            }
                        }
                    }
                },
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

}
