import express from "express";
import auth from "../middleware/authMiddleware.js";
import register from "../controllers/authControllers/register.js";
import login from "../controllers/authControllers/login.js";
import logout from "../controllers/authControllers/logout.js";
import current from "../controllers/authControllers/current.js";

const authRouter = express.Router();

const jsonParse = express.json();

authRouter.post("/register", jsonParse, register);
authRouter.post("/login", jsonParse, login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, current);

export default authRouter;