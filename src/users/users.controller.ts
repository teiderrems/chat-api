import {
  Body,
  Controller, Delete, FileTypeValidator,
  Get, MaxFileSizeValidator,
  NotFoundException,
  Param, ParseFilePipe,
  ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/users';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryDto } from '../dtos/query';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  findAll(@Query() query:QueryDto){
    try {
      return this.usersService.findAll(query);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }
  
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id:number){
    try {
      return this.usersService.findOne(id);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('profil'))
  create(@Body() data:CreateUserDto,@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 10000 }),
      new FileTypeValidator({fileType:'image/*'})
    ],
    fileIsRequired: false,
  }),) file: Express.Multer.File){
    try {
      return this.usersService.create(data,file);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('profil'))
  update(@Param('id',ParseIntPipe) id:number,@Body() data:CreateUserDto,@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 10000 }),
      new FileTypeValidator({fileType:'image/*'})
    ],
    fileIsRequired: false,
  }),) file: Express.Multer.File){
    try {
      return this.usersService.update(id,data,file);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id:number){
    try {
      return this.usersService.delete(id);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }
}
