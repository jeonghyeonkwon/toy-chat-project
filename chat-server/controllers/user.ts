import { NextFunction, Response, Request } from "express";
import { v4 } from "uuid";
import { sequelize } from "../models";
import User from '../models/user';

export const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    const transaction = await sequelize.transaction();
    try{
        const {userName} = req.body;
        await User.create({
            userName:userName,
            userUUID:v4(),
        },{transaction});

        transaction.commit();
    }catch(err){
        transaction.rollback();
        next(err);
    }
    
}