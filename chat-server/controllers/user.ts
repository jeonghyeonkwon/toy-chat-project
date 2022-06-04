import { NextFunction, Response, Request } from "express";
import { join } from "path/posix";
import { v4 } from "uuid";

import { sequelize } from "../models";
import User from "../models/user";
import * as jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, userPassword } = req.body;
    if (!userId || !userPassword) {
      throw Error("아이디와 비밀번호 중 빈 값이 있습니다.");
    }
    const isExistUser = await User.findOne({ where: { userId } });
    if (isExistUser) {
      throw Error(`사용 중인 아이디 입니다`);
    }
    const encodedPassword = await bcrypt.hash(userPassword, 14);
    const createUser = await User.create(
      {
        userId: userId,
        userPassword: encodedPassword,
        userRandomId: v4(),
      },
      { transaction }
    );

    await transaction.commit();
    res.status(201).send({
      msg: createUser.userRandomId,
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, userPassword } = req.body;
    const isExistUser = await User.findOne({ where: { userId } });
    if (!isExistUser) {
      throw Error("존재하지 않는 유저입니다.");
    }
    const passwordBool = await bcrypt.compare(
      userPassword,
      isExistUser.userPassword
    );

    if (!passwordBool) {
      throw Error("비밀번호를 다시 확인해 주세요");
    }

    const token = jwt.sign(
      {
        id: isExistUser.userRandomId,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "60m",
        issuer: "jeonghyeonkwon",
      }
    );
    return res.status(200).send({
      token: token,
      userRandomId: isExistUser.userRandomId,
    });
  } catch (err) {
    next(err);
  }
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = req.decoded! as jwt.JwtPayload;
    res.status(200).send({
      userRandomId: decoded.id!,
    });
  } catch (err) {
    next(err);
  }
};
