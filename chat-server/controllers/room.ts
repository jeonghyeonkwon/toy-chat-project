import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import { v4 } from "uuid";
import { RoomStatusEnum } from "../enums/RoomEnum";
import { IChatGroup } from "../interfaces/chat";
import { sequelize } from "../models";
import Room from "../models/room";
import Chat from "../models/chat";
import { ChatDto } from "../dto/ChatDto";
import User from "../models/user";
import { IRoomGroup } from "../interfaces/room";
import { RoomDto } from "../dto/RoomDto";
export const roomList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomList = await Room.findAll({
      where: {
        roomStatus: RoomStatusEnum.ING,
      },
    });
    const roomDtoList = roomList.map(
      (obj) => new RoomDto(obj.roomTitle, obj.roomRandomId, obj.totalPerson)
    ) as RoomDto[];
    res.status(200).send(roomDtoList);
  } catch (err) {
    next(err);
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

export const chatList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomRandomId = req.params.id!;
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
    console.log("chat list");
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
    console.log(chatDtoList);
    res.status(200).send(chatDtoList);
  } catch (err) {
    next(err);
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
    return new RoomDto(
      updateRoom.roomTitle,
      updateRoom.roomRandomId,
      updateRoom.totalPerson
    );
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
    console.log(chat);
    const isExistUser = await User.findOne({ where: { userRandomId } });
    if (!isExistUser) throw Error(`유저가 없음`);
    const createChat = await Chat.create(
      {
        roomRandomId: roomRandomId,
        userRandomId: userRandomId,
        message: message,
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
