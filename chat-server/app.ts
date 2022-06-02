import * as express from "express";
import * as morgan from "morgan";
import * as session from "express-session";
import { webSocket } from "./socket";
import * as dotenv from "dotenv";
import * as cors from "cors";
const { sequelize } = require("./models");
import userRouter from "./routes/user";

dotenv.config();

const app = express();

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("연결 성공");
  })
  .catch(() => {
    console.log("에러");
  });

app.set("port", process.env.PORT || 8000);

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/api/user", userRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    return res.status(400).send({ msg: err.message });
  }
);

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

server;
// webSocket(server);
