import * as express from "express";
import { roomList, createRoom, chatList } from "../controllers/room";
const router = express.Router();
router.get("/", roomList);
router.post("/", createRoom);
router.get("/:id", chatList);
export default router;
