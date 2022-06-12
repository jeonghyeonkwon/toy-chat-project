import { RoomResponseEnum } from "../enums/RoomEnum";
import { RoomDto } from "./RoomDto";
export class RoomResponseDto {
  roomStatus: RoomResponseEnum;
  roomData: Array<RoomDto>;

  constructor(roomStatus: RoomResponseEnum, roomDtoList: Array<RoomDto>) {
    this.roomStatus = roomStatus;
    this.roomData = roomDtoList;
  }
}
