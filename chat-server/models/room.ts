import { DataTypes, Model } from "sequelize";
import { dbType } from "./index";
import {sequelize}from './sequelize';
class Room extends Model{
    public readonly id!:number;
    public readonly roomTitle!:string;
    public readonly roomtRandomId!:string;
    public readonly maxTotalPerson!:number;

}
Room.init({
    roomTitle:{
        type: DataTypes.STRING,
        allowNull:false

    },
    maxTotalPerson:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    roomRandomId:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    sequelize,
    timestamps:true,
    underscored:true,
    modelName:'Room',
    tableName:'rooms',
    paranoid:true,
    charset:'utf8',
    collate:'utf8_general_ci'
})

export const associate = (db:dbType)=>{
    
};
export default Room;