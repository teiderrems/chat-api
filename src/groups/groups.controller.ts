import {
  Body,
  Controller, Delete,
  Get,
  NotFoundException,
  Param, ParseIntPipe, Post, Put,
  Query,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto, UpdateGroupDto } from '../dtos/groups';

@Controller('groups')
export class GroupsController {
  
  constructor(private readonly groupsService:GroupsService) {}
  
  @Get()
  findAll(@Query('name') name:string){
    try {
      return this.groupsService.findAll(name);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }
  
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id:number){
    try {
      return this.groupsService.findOne(id);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Post()
  create(@Body() data:CreateGroupDto){
    try {
      return this.groupsService.create(data)
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Put(':id')
  update(@Param('id',ParseIntPipe) id:number,@Body() data:UpdateGroupDto){
    try {
      return this.groupsService.update(id,data)
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Post(':id/add-user')
  addUser(@Param('id',ParseIntPipe) id:number,@Body() data:number){
    try {
      return this.groupsService.addUser(id,data)
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Post(':id/add-many-users')
  addManyUsers(@Param('id',ParseIntPipe) id:number,@Body() data:number[]){
    try {
      return this.groupsService.addManyUser(id,data);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }

  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id:number){
    try {
      return this.groupsService.delete(id);
    }
    catch (_error) {
      return new NotFoundException(_error);
    }
  }
}
