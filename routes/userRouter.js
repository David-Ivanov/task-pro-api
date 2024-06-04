import express from "express";
import { updateAvatar, updateSubscription } from "../controllers/userControllers.js";
import auth from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const userRouter = express.Router();

const jsonParse = express.json();

userRouter.patch("/", auth, jsonParse, updateSubscription);
userRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

export default userRouter;