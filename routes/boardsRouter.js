import express from "express";

import auth from "../middleware/authMiddleware.js";
import getBoard from "../controllers/boardsControllers/getBoard.js";
import deleteBoard from "../controllers/boardsControllers/deleteBoard.js";
import createBoard from "../controllers/boardsControllers/createBoard.js";
import updateBoard from "../controllers/boardsControllers/updateBoard.js";
import changeBoardsBackground from "../controllers/boardsControllers/changeBoardsBackground.js";
import getAllBoards from "../controllers/boardsControllers/getAllBoards.js";

const boardsRouter = express.Router();
const jsonParse = express.json();

boardsRouter.get("/", auth, getAllBoards);

boardsRouter.get("/:id", auth, getBoard);

boardsRouter.delete("/:id", auth, deleteBoard);

boardsRouter.post("/", auth, jsonParse, createBoard);

boardsRouter.put("/:id", auth, jsonParse, updateBoard);

boardsRouter.patch("/:id", auth, jsonParse, changeBoardsBackground);

export default boardsRouter;
