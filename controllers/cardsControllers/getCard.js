import mongoose from "mongoose";
import HttpError from "../../helpers/HttpError.js";
import Card from "../../models/cardsModel.js";

const getCard = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const card = await Card.findOne({
      _id: req.params.cardId,
    });

    if (card === null) {
      return res.status(404).send({ message: HttpError(404).message });
    }

    return res.status(200).send({ data: card });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default getCard;
