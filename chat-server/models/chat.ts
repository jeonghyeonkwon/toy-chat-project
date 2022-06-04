import { DataTypes, Model } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
class Room extends Model {
  public readonly id!: number;
  public readonly roomRandomId!: string;
  public readonly userRandomId!: string;
  public readonly message!: string;
}
Room.init(
  {
    roomRandomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRandomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "Chat",
    tableName: "chats",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export const associate = (db: dbType) => {};
export default Room;
