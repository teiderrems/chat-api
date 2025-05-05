export class ChatDto {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  content: Content[];
}

interface Content {
  owner: string;
  content: string;
}

export class CreateChatDto {
  name: string;
  ownerId: number;
}

export class UpdateChatDto {
  name: string;
}
