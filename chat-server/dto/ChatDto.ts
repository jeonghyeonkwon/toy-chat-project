export class ChatDto {
  writerId: string;
  userRandomId: string;
  roomRandomId: string;
  message: string;
  createdAt: Date;
  constructor(
    writerId: string,
    userRandomId: string,
    roomRandomId: string,
    message: string,
    createdAt: Date
  ) {
    this.writerId = writerId;
    this.userRandomId = userRandomId;
    this.roomRandomId = roomRandomId;
    this.message = message;
    this.createdAt = createdAt;
  }
}
