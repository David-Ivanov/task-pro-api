import express from "express";
import auth from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import updateAvatar from "../controllers/userControllers/updateAvatar.js";
import editProfile from "../controllers/userControllers/editProfile.js";
import changeTheme from "../controllers/userControllers/changeTheme.js";
import needHelp from "../controllers/userControllers/needHelp.js";

const userRouter = express.Router();

const jsonParse = express.json();

userRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
userRouter.patch("/edit", jsonParse, auth, editProfile);
userRouter.patch("/theme", jsonParse, auth, changeTheme);
userRouter.put("/help", jsonParse, auth, needHelp);

export default userRouter; 