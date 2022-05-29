import User,{associate as associateUser} from './user'
import Room,{associate as associateRoom} from './room'
export * from './sequelize'

const db = {
    User,
    Room
};

export type dbType = typeof db;
associateUser(db);
associateRoom(db);
