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

const prevChatData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const createChatData = async (chat: IChatGroup) => {
  const transaction = await sequelize.transaction();
  const { type, roomRandomId, userRandomId, message } = chat;
  try {
    console.log(chat);
    const isExistUser = await User.findOne({ where: { userRandomId } });
    if (!isExistUser) throw Error(`유저가 없음`);
    const createChat = await Chat.create({
      roomRandomId: roomRandomId,
      userRandomId: userRandomId,
      message: message,
    });
    transaction.commit();
    const chatObject = new ChatDto(
      isExistUser.userId,
      userRandomId,
      roomRandomId,
      message
    );
    return chatObject;
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return null;
  }
};
