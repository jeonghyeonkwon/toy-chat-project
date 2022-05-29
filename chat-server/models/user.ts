import { DataTypes, Model } from "sequelize";
import { dbType } from "./index";
import {sequelize}from './sequelize';
class User extends Model{
    public readonly id!:number;
    public readonly userName!:string;
    public readonly userRandomId!:string;

}
User.init({
    userName:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    userRandomId:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }

},{
    sequelize,
    timestamps:true,
    underscored:true,
    modelName:'User',
    tableName:'users',
    paranoid:true,
    charset:'utf8',
    collate:'utf8_general_ci'
})

export const associate = (db:dbType)=>{
    
};
export default User;