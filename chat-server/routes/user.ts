import * as express from "express";
import { createUser, loginUser } from "../controllers/user";

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
export default router;
