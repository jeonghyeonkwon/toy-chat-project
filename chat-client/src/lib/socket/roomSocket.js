import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
// import axios from "axios";
export const SOCKET_DEFAULT_URL = "http://127.0.0.1:8000";
export const SOCKET_ROOM_URL = `${SOCKET_DEFAULT_URL}/room`;

const ROOM_CREATE_EVENT = "createRoom";
const ROOM_INIT_EVENT = "roomInit";
const ROOM_INFO_EVENT = "roomInfo";
const ROOM_UPDATE_EVENT = "updateRoom";
export const useCreateRoomSocket = () => {
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io(SOCKET_ROOM_URL, { path: "/socket.io" });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  const sendCreateRoom = (createSuccess, roomForm) => {
    socketRef.current.emit(ROOM_CREATE_EVENT, {
      roomRandomId: createSuccess,
      roomTitle: roomForm.roomTitle,
    });
  };
  return { sendCreateRoom };
};

export const useScribeRoomSocket = () => {
  const socketRef = useRef();
  const [room, setRoom] = useState([]);
  const [initFlag, setInitFlag] = useState(false);
  useEffect(() => {
    socketRef.current = io(SOCKET_ROOM_URL, { path: "/socket.io" });
    //   async function fetchRoomList() {
    //     const result = await axios.get(`${SOCKET_DEFAULT_URL}/api/room`);
    //     console.log(result);
    //     const roomList = result.data;
    //     console.log(roomList);
    //     setRoom(roomList);
    //   }
    //   fetchRoomList();

    socketRef.current.on(ROOM_INIT_EVENT, (data) => {
      if (!initFlag) {
        setRoom(data);
        setInitFlag(true);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socketRef.current.on(ROOM_INFO_EVENT, (data) => {
      console.log(data);
      setRoom([...room, data]);
      console.log("room---------");
      console.log(room);
    });

    socketRef.current.on(ROOM_UPDATE_EVENT, (data) => {
      console.log(data);
      if (data.roomStatus === "create") {
        setRoom([...room, ...data.roomData]);
      } else if (data.roomStatus === "update") {
        console.log("-------room------");
        console.log(room);
        const targetRoom = room.filter(function (obj) {
          if (obj.roomRandomId === data.roomRandomId) return obj;
        })[0];
        const updateRoom = {
          ...targetRoom,
          totalPerson: data.roomTotalPerson,
        };
        console.log("target1");
        console.log(typeof targetRoom);

        console.log();
        console.log(targetRoom);
        // const { roomTitle, roomRandomId } = targetRoom;
        // if (roomTitle !== undefined && roomRandomId !== undefined) {
        // console.log(`title ${roomTitle}, randomId ${roomRandomId}`);
        setRoom([
          ...room.filter((obj) => obj.roomRandomId !== data.roomRandomId),
          updateRoom,
        ]);
        console.log("state");
        console.log(room);
        // }
      } else if (data.roomStatus === "close") {
        setRoom([
          ...room.filter((obj) => obj.roomRandomId !== data.roomRandomId),
        ]);
      }
    });
  }, [initFlag]);

  return { room };
};
