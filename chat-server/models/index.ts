import User, { associate as associateUser } from "./user";
import Room, { associate as associateRoom } from "./room";
import Chat, { associate as associateChat } from "./chat";
export * from "./sequelize";

const db = {
  User,
  Room,
  Chat,
};

export type dbType = typeof db;
associateUser(db);
associateRoom(db);
associateChat(db);
