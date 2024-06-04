import express from "express";

import auth from "../middleware/authMiddleware.js";
import getAllCards from "../controllers/cardsControllers/getAllCards.js";
import getCard from "../controllers/cardsControllers/getCard.js";
import deleteCard from "../controllers/cardsControllers/deleteCard.js";
import createCard from "../controllers/cardsControllers/createCard.js";
import updateCard from "../controllers/cardsControllers/updateCard.js";

const cardsRouter = express.Router();
const jsonParse = express.json();

cardsRouter.get("/", auth, getAllCards);

cardsRouter.get("/:id", auth, getCard);

cardsRouter.delete("/:id", auth, deleteCard);

cardsRouter.post("/", auth, jsonParse, createCard);

cardsRouter.put("/:id", auth, jsonParse, updateCard);

export default cardsRouter;