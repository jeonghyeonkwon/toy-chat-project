export class RoomDto {
  roomTitle: string;
  roomRandomId: string;
  totalPerson: number;
  constructor(roomTitle: string, roomRandomId: string, totalPerson: number) {
    this.roomTitle = roomTitle;
    this.roomRandomId = roomRandomId;
    this.totalPerson = totalPerson;
  }
}
