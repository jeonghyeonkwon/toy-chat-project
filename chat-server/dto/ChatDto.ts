export class ChatDto {
  writerId: string;
  userRandomId: string;
  roomRandomId: string;
  message: string;

  constructor(
    writerId: string,
    userRandomId: string,
    roomRandomId: string,
    message: string
  ) {
    this.writerId = writerId;
    this.userRandomId = userRandomId;
    this.roomRandomId = roomRandomId;
    this.message = message;
  }
}
