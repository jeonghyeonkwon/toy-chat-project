import * as express from "express";
import { createUser, loginUser, validateToken } from "../controllers/user";
import { verifyToken } from "./middlewares";
const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/validate", verifyToken, validateToken);

export default router;
