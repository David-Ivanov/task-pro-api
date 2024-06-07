import mongoose from "mongoose";
import HttpError from "../../helpers/HttpError.js";
import { updateCardSchema } from "../../schemas/boardsSchemas.js";
import Card from "../../models/cardsModel.js";

const updateCard = async (req, res) => {
  const { error, value } = updateCardSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  } else if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.cardId },
      value,
      { new: true }
    );

    if (card === null) {
      return res.status(404).send({ message: HttpError(404).message });
    }

    return res.status(201).send({ data: card });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default updateCard;
