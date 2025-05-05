import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto, UpdateChatDto } from '../dtos/chats';

@Controller('chats')
export class ChatsController {

  constructor(private readonly chatsService: ChatsService) {}

  @Get(':ownerId/chats')
  findAll(@Param('ownerId',ParseIntPipe) ownerId:number,@Query('name') name: string) {
    try {
      return this.chatsService.findAll(ownerId,name);
    }
    catch (_error) {
      return  new NotFoundException(_error);
    }
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    try {
      return this.chatsService.findOne(id);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Post()
  create(@Body() data:CreateChatDto){
    try {
      return this.chatsService.create(data);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Put(':id')
  update(@Param('id',ParseIntPipe) id:number,@Body() data:UpdateChatDto){
    try {
      return this.chatsService.update(id,data)
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id:number){
    try {
      return this.chatsService.remove(id);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }
}
