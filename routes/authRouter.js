import express from "express";
import { current, login, logout, register, sendEmailAgain, verify } from "../controllers/authControllers.js";
import auth from "../middleware/authMiddleware.js";

const authRouter = express.Router();

const jsonParse = express.json();

authRouter.post("/register", jsonParse, register);
authRouter.post("/login", jsonParse, login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, current);
authRouter.get("/verify/:verificationToken", verify);
authRouter.post("/verify", jsonParse, sendEmailAgain);

export default authRouter;