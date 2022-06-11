import { RoomResponseEnum } from "../enums/RoomEnum";
export class RoomResponseDto {
  roomStatus: RoomResponseEnum;
  roomRandomId: string;
  roomTotalPerson: number;

  constructor(
    roomStatus: RoomResponseEnum,
    roomRandomId: string,
    roomTotalPerson: number
  ) {
    this.roomStatus = roomStatus;
    this.roomRandomId = roomRandomId;
    this.roomTotalPerson = roomTotalPerson;
  }
}
