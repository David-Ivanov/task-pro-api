import mongoose from "mongoose";
import HttpError from "../../helpers/HttpError.js";
import Card from "../../models/cardsModel.js";

const getAllCards = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.columnId)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const cards = await Card.find({ columnId: req.params.columnId });

    // if (cards.length === 0) {
    //   return res.status(404).send({ message: HttpError(404).message });
    // }

    return res.status(200).send({ cards });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default getAllCards;
