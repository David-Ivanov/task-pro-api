import express from "express";
import auth from "../middleware/authMiddleware.js";
import editProfile from "../controllers/userControllers/editProfile.js";
import changeTheme from "../controllers/userControllers/changeTheme.js";
import needHelp from "../controllers/userControllers/needHelp.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userRouter = express.Router();

const jsonParse = express.json();

userRouter.patch("/edit", auth, upload.single("avatar"), editProfile);
userRouter.patch("/theme", jsonParse, auth, changeTheme);
userRouter.put("/help", jsonParse, auth, needHelp);

export default userRouter; 
