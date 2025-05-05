export class MessageDto {
  id: number;
  content?: string | null;
  isRead: boolean;
  File?:
    | {
        id: number;
        fileUrl: string;
      }[]
    | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export class CreateMessageDto {
  content: string;
  ownerId: number;
}

export class UpdateMessageDto {
  content: string;
}
