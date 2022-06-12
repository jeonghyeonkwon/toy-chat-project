import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import { v4 } from "uuid";
import {
  RoomStatusEnum,
  RoomUpdateEnum,
  RoomResponseEnum,
} from "../enums/RoomEnum";
import { IChatGroup } from "../interfaces/chat";
import { sequelize } from "../models";
import Room from "../models/room";
import Chat from "../models/chat";
import { ChatDto } from "../dto/ChatDto";
import User from "../models/user";
import { IRoomGroup } from "../interfaces/room";
import { RoomDto } from "../dto/RoomDto";
import { RoomResponseDto } from "../dto/RoomResponseDto";

export const roomList = async () =>
  // req: Request,
  // res: Response,
  // next: NextFunction
  {
    try {
      const roomList = await Room.findAll({
        where: {
          roomStatus: RoomStatusEnum.ING,
        },
      });
      const roomDtoList = roomList.map(
        (obj) => new RoomDto(obj.roomTitle, obj.roomRandomId, obj.totalPerson)
      ) as RoomDto[];
      return roomDtoList;
      // res.status(200).send(roomDtoList);
    } catch (err) {
      // next(err);
      console.error(err);
    }
  };
export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { roomTitle } = req.body;
    if (!roomTitle) {
      throw Error("방 이름을 작성해 주세요.");
    }
    const createRoom = await Room.create(
      {
        roomTitle: roomTitle,
        roomRandomId: v4(),
        roomStatus: RoomStatusEnum.READY,
        totalPerson: 0,
      },
      { transaction }
    );
    await transaction.commit();
    res.status(201).send({
      id: createRoom.roomRandomId,
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

export const roomUpdate = async (
  roomUpdateType: RoomUpdateEnum,
  roomRandomId: string,
  chat: any
) => {
  const transaction = await sequelize.transaction();
  try {
    console.log("set");
    console.log(roomRandomId);
    console.log(chat.rooms.get(roomRandomId));
    const room = await Room.findOne({ where: { roomRandomId: roomRandomId } });
    if (!room) return null;
    if (chat.rooms.get(roomRandomId) === undefined) {
      const result = await room.update(
        {
          roomStatus: RoomStatusEnum.FINISH,
          totalPerson: 0,
        },
        { transaction }
      );
      await transaction.commit();
      return new RoomResponseDto(RoomResponseEnum.CLOSE, [
        new RoomDto(result.roomTitle, roomRandomId, result.totalPerson),
      ]);
    } else {
      const result = await room.update(
        {
          totalPerson: chat.rooms.get(roomRandomId).size,
        },
        { transaction }
      );
      await transaction.commit();
      return new RoomResponseDto(RoomResponseEnum.UPDATE, [
        new RoomDto(result.roomTitle, roomRandomId, result.totalPerson),
      ]);
    }
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return null;
  }
};
export const chatList = async (
  // req: Request,
  // res: Response,
  // next: NextFunction
  roomRandomId: string
) => {
  try {
    // const roomRandomId = req.params.id!;
    const isExistRoom = await Room.findOne({ where: { roomRandomId } });
    if (!isExistRoom || isExistRoom.roomStatus === RoomStatusEnum.FINISH) {
      throw Error("존재하지 않는 방입니다.");
    }
    const chatList = await Chat.findAll({
      where: {
        roomRandomId: roomRandomId,
      },
      include: {
        model: User,
      },
    });

    const chatDtoList = chatList.map(
      (chat) =>
        new ChatDto(
          chat.User.userId,
          chat.User.userRandomId,
          chat.roomRandomId,
          chat.message,
          chat.createdAt
        )
    );
    return { roomTitle: isExistRoom.roomTitle, chatDtoList: chatDtoList };
    // res
    //   .status(200)
    //   .send({ roomTitle: isExistRoom.roomTitle, chatDtoList: chatDtoList });
  } catch (err) {
    // next(err);
    console.error(err);
    return null;
  }
};

export const createRoomChangeStatus = async (room: IRoomGroup) => {
  const transaction = await sequelize.transaction();
  try {
    const { roomRandomId, roomTitle } = room;
    const isExistRoom = await Room.findOne({ where: { roomRandomId } });
    if (!isExistRoom) {
      throw Error("방이 존재 하지 않습니다");
    }
    if (isExistRoom.roomStatus !== RoomStatusEnum.READY) {
      throw Error("이미 생성된 방입니다");
    }
    const updateRoom = await isExistRoom.update(
      {
        roomStatus: RoomStatusEnum.ING,
        totalPerson: 1,
      },
      { transaction }
    );
    await transaction.commit();
    return new RoomResponseDto(RoomResponseEnum.CREATE, [
      new RoomDto(
        updateRoom.roomTitle,
        updateRoom.roomRandomId,
        updateRoom.totalPerson
      ),
    ]);

    // new RoomDto(
    //   updateRoom.roomTitle,
    //   updateRoom.roomRandomId,
    //   updateRoom.totalPerson
    // );
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return null;
  }
};
export const createChatData = async (chat: IChatGroup) => {
  const transaction = await sequelize.transaction();
  const { type, roomRandomId, userRandomId, message } = chat;
  try {
    // console.log(chat);
    const isExistUser = await User.findOne({ where: { userRandomId } });
    if (!isExistUser) throw Error(`유저가 없음`);
    const createChat = await Chat.create(
      {
        roomRandomId: roomRandomId,
        userRandomId: userRandomId,
        message: message,
        chatRandomId: v4(),
      },
      { transaction }
    );
    await createChat.setUser(isExistUser, { transaction });
    transaction.commit();
    const chatObject = new ChatDto(
      isExistUser.userId,
      userRandomId,
      roomRandomId,
      message,
      createChat.createdAt
    );
    return chatObject;
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return null;
  }
};
