import { NextFunction, Response, Request } from "express";
import { v4 } from "uuid";
import { sequelize } from "../models";
import User from '../models/user';

export const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    const transaction = await sequelize.transaction();
    try{
        const {userName} = req.body;
        const createUser = await User.create({
            userName:userName,
            userRandomId:v4(),
        },{transaction});

        transaction.commit();
        res.status(201).send({
            msg: createUser.userRandomId
        })
    }catch(err){
        transaction.rollback();
        next(err);
    }
    
}