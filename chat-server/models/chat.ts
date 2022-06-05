import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
} from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
import User from "./user";
class Chat extends Model {
  public readonly id!: number;
  public readonly roomRandomId!: string;
  public readonly userRandomId!: string;
  public readonly message!: string;
  public readonly createdAt!: Date;
  public readonly User!: User;

  public setUser!: BelongsToSetAssociationMixin<User, string>;
  public getUser!: BelongsToGetAssociationMixin<User>;
}
Chat.init(
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

export const associate = (db: dbType) => {
  db.Chat.belongsTo(db.User, {
    foreignKey: "user_pk",
    targetKey: "userRandomId",
  });
};
export default Chat;
