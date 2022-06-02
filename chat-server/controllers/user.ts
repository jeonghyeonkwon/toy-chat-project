import { NextFunction, Response, Request } from "express";
import { v4 } from "uuid";

import { sequelize } from "../models";
import User from "../models/user";
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

    transaction.commit();
    res.status(201).send({
      msg: createUser.userRandomId,
    });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};
