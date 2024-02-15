import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

import { connect } from "./lib/db";
import authRouter from "./routes/auth.route";
import roomRouter from "./routes/room.route";

dotenv.config();
connect();

const PORT = process.env.PORT || 8080;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
