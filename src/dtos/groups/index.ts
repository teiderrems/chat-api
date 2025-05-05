import { ChatDto } from '../chats';
export class GroupDto {
  chat: any;
  id: number;
  name: string | null;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export class CreateGroupDto {
  name: string;
  description: string | null;
  ownerId: number;
}

export class UpdateGroupDto {
  name: string;
  description: string | null;
}
