import mongoose from "mongoose";
import HttpError from "../../helpers/HttpError.js";
import { createCardSchema } from "../../schemas/boardsSchemas.js";
import Card from "../../models/cardsModel.js";

const createCard = async (req, res) => {
  const { error, value } = createCardSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  } else if (!mongoose.Types.ObjectId.isValid(value.columnId)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const card = await Card.create(value);
    return res.status(201).send({ data: card });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default createCard;
