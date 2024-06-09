import express from "express";
import auth from "../middleware/authMiddleware.js";
import register from "../controllers/authControllers/register.js";
import login from "../controllers/authControllers/login.js";
import logout from "../controllers/authControllers/logout.js";

const authRouter = express.Router();

const jsonParse = express.json();

authRouter.post("/register", jsonParse, register);
authRouter.post("/login", jsonParse, login);
authRouter.post("/logout", auth, logout);

export default authRouter;
