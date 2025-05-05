import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import{ CreateUserDto, UpdateUserDto, UsersDto } from '../dtos/users';
import { PrismaPromise } from '@prisma/client';
import supabase from '../supabase';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { QueryDto } from '../dtos/query';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {}

  findAll(query:QueryDto): PrismaPromise<UsersDto[]> {

    if (query.search && query.search.length > 0){
      return this.prisma.user.findMany({
        where:{
          OR:[
            {firstName:{contains:query.search}},
            {lastName:{contains:query.search}},
            {email:{contains:query.search}},
            {phoneNumber:{contains:query.search}},
          ]
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          profil: true,
          createdAt: true,
          updatedAt: true,
        },
        take:Number(query.limit),
        skip:Number(query.limit)*Number(query.offset),
        orderBy:{
          id:'asc'
        }
      });
    }
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profil: true,
        createdAt: true,
        updatedAt: true,
      },
      take:Number(query.limit),
      skip:Number(query.limit)*Number(query.offset),
      orderBy:{
        id:'asc'
      }
    });
  }

  findOne(id: number): PrismaPromise<UsersDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profil: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async findByEmail(email: string): Promise<UsersDto | null> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profil: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<UsersDto | null> {
    return await this.prisma.user.findUnique({
      where: { phoneNumber },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profil: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(createUserDto: CreateUserDto,file: Express.Multer.File) {

    if (file) {
      try {
          const { data, error } = await supabase.storage
            .from(
              this.configService.get<string>('SUPABASE_BUCLET_NAME')! +
              '/profiles',
            )
            .upload(`${uuidv4()}-${file.originalname}`, file.buffer, {
              cacheControl: '3600',
              upsert: true,
              contentType: file.mimetype,
            });
          if (data){
            createUserDto.profil=`${this.configService.get<string>('SUPABASE_PROJET_URL')}/storage/v1/object/public/${data.fullPath}`;
          }
      } catch (error) {
        console.error(error);
      }
    }
    return this.prisma.user.create({
      data:{
        firstName: createUserDto.firstname??null,
        lastName: createUserDto.lastName??null,
        email: createUserDto.email??null,
        phoneNumber: createUserDto.phoneNumber as string,
        profil: createUserDto.profil??null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profil: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }


  delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profil: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }


  async update(id: number, updateDto: UpdateUserDto,file: Express.Multer.File): Promise<{id:number}> {

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profil: true}});
    if (!user) {
      throw new Error('User not found');
    }
    if (file) {
      if (user && user?.profil && user?.profil.includes('supabase')) {
        const path = user.profil.split('//')[1].split('/')[
        user.profil.split('//')[1].split('/').length - 1
          ];
        await supabase.storage
          .from(
            this.configService.get<string>('SUPABASE_BUCLET_NAME')! +
            '/profiles',
          )
          .remove([path]);
      }
      const { data, error } = await supabase.storage
        .from(
          this.configService.get<string>('SUPABASE_BUCLET_NAME')! +
          '/profiles',
        )
        .upload(`${uuidv4()}-${file.originalname}`, file.buffer, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.mimetype,
        });
      updateDto.profil = data? `${this.configService.get<string>('SUPABASE_PROJET_URL')}/storage/v1/object/public/${data.fullPath}`
        : user?.profil;
    }
    return this.prisma.user.update({
      where: { id },
      data:{
        firstName: updateDto.firstname??user.firstName,
        lastName: updateDto.lastName?? user.lastName,
        email: updateDto.email?? user.email,
        phoneNumber: updateDto.phoneNumber?? user.phoneNumber,
        profil: updateDto.profil,
      },
      select: {
        id: true
      },
    });
  }
}
