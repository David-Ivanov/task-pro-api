import express from "express";

import auth from "../middleware/authMiddleware.js";
import getColumn from "../controllers/columnsControllers/getColumn.js";
import getAllColumns from "../controllers/columnsControllers/getAllColumns.js";
import deleteColumn from "../controllers/columnsControllers/deleteColumn.js";
import createColumn from "../controllers/columnsControllers/createColumn.js";
import updateColumn from "../controllers/columnsControllers/updateColumn.js";

const columnsRouter = express.Router();
const jsonParse = express.json();

columnsRouter.get("/", auth, getAllColumns);

columnsRouter.get("/:id", auth, getColumn);

columnsRouter.delete("/:id", auth, deleteColumn);

columnsRouter.post("/", auth, jsonParse, createColumn);

columnsRouter.put("/:id", auth, jsonParse, updateColumn);

export default columnsRouter;