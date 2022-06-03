import * as express from "express";
import { createRoom } from "../controllers/room";
const router = express.Router();
router.post("/", createRoom);
export default router;
