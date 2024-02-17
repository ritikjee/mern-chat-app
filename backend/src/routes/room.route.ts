import { Router } from "express";
import {
  addMember,
  createRoom,
  deleteRooms,
  editRoom,
  getRoom,
  getRooms,
} from "../controllers/room.controller";

const roomRouter = Router();

roomRouter.post("/create-room", createRoom);
roomRouter.get("/get-rooms", getRooms);
roomRouter.get("/get-room", getRoom);
roomRouter.get("/invite-member", addMember);
roomRouter.post("/delete-room", deleteRooms);
roomRouter.post("/edit-room", editRoom);

export default roomRouter;
