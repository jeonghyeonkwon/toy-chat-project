import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { RoomStatusEnum } from "../enums/RoomEnum";
import { sequelize } from "../models";
import Room from "../models/room";

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
