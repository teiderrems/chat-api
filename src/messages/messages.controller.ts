import {
  Body,
  Controller, Delete,
  Get, MaxFileSizeValidator,
  NotFoundException,
  Param, ParseFilePipe,
  ParseIntPipe,
  Post, Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, UpdateMessageDto } from '../dtos/messages';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll() {
    try {
      return this.messagesService.findAll();
    } catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.messagesService.findOne(id);
    } catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() data: CreateMessageDto,
    @UploadedFiles(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 10000 }),
      ],
      fileIsRequired: false,
    }),) files: Array<Express.Multer.File>,
  ) {
    try {
      return this.messagesService.create(data,files);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMessageDto) {
    try {
      return this.messagesService.update(id, data);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.messagesService.delete(id);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }
}
