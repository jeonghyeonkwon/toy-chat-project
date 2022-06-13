import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
// import axios from "axios";
export const SOCKET_DEFAULT_URL = "http://127.0.0.1:8000";
export const SOCKET_ROOM_URL = `${SOCKET_DEFAULT_URL}/room`;

const ROOM_CREATE_EVENT = "createRoom";
const ROOM_INIT_EVENT = "roomInit";

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
  function createRoomFn(data) {
    console.log("createRoomFn");
    setRoom([...room, ...data.roomData]);
  }
  function updateRoomFn(data) {
    console.log("updateRoomFn");

    console.log(room);
    console.log("updateData");
    console.log(data);
    const targetRoom = room.filter(function (obj) {
      if (obj.roomRandomId === data.roomData[0].roomRandomId) return obj;
    })[0];
    const updateRoom = {
      ...targetRoom,
      totalPerson: data.roomData[0].totalPerson,
    };
    setRoom([
      ...room.filter(
        (obj) => obj.roomRandomId !== data.roomData[0].roomRandomId
      ),
      updateRoom,
    ]);
  }
  function deleteRoomFn(data) {
    console.log("deleteRoomFn");
    setRoom([
      ...room.filter(
        (obj) => obj.roomRandomId !== data.roomData[0].roomRandomId
      ),
    ]);
  }
  function roomUpdateFn(data) {
    console.log(data);
    if (data.roomStatus === "create") {
      createRoomFn(data);
    } else if (data.roomStatus === "update") {
      updateRoomFn(data);
    } else if (data.roomStatus === "close") {
      deleteRoomFn(data);
    }
  }
  useEffect(() => {
    socketRef.current.on(ROOM_UPDATE_EVENT, roomUpdateFn);
    return () => {
      socketRef.current.off(ROOM_UPDATE_EVENT, roomUpdateFn);
    };
  }, [room]);

  return { room };
};
