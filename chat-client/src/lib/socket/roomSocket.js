import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
export const SOCKET_DEFAULT_URL = "http://127.0.0.1:8000";
export const SOCKET_ROOM_URL = `${SOCKET_DEFAULT_URL}/room`;

const ROOM_CREATE_EVENT = "createRoom";
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
  useEffect(() => {
    socketRef.current = io(SOCKET_ROOM_URL, { path: "/socket.io" });
    async function fetchRoomList() {
      const result = await axios.get(`${SOCKET_DEFAULT_URL}/api/room`);
      console.log(result);
      const roomList = result.data;
      console.log(roomList);
      setRoom(roomList);
    }
    fetchRoomList();

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socketRef.current.on(ROOM_INFO_EVENT, (data) => {
      console.log(data);
      setRoom([...room, data]);
    });
    socketRef.current.on(ROOM_UPDATE_EVENT, (data) => {
      console.log(data);
      const { roomStatus, roomRandomId, roomTotalPerson } = data;
      if (roomStatus === "update") {
        const targetRoom = room.filter(
          (obj) => obj.roomRandomId === roomRandomId
        );
        console.log("target1");
        console.log(targetRoom[0]);
        setRoom([
          ...room.filter((obj) => obj.roomRandomId !== roomRandomId),
          {
            roomTitle: targetRoom[0].roomTitle,
            roomRandomId: targetRoom[0].roomRandomId,
            totalPerson: roomTotalPerson,
          },
        ]);
        console.log("state");
        console.log(room);
      } else if (roomStatus === "close") {
        setRoom([...room.filter((obj) => obj.roomRandomId !== roomRandomId)]);
      }
    });
  }, [room]);
  return { room };
};
