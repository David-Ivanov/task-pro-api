import Board from "../../models/boardsModel.js";
import { updateBoardSchema } from "../../schemas/boardsSchemas.js";
import mongoose from "mongoose";
import HttpError from "../../helpers/HttpError.js";

const updateBoard = async (req, res) => {
  const { error, value } = updateBoardSchema.validate(req.body);

  // перевірка помилок валідації + корректності переданого ІД
  if (error) {
    return res.status(400).send({ message: error.message });
  } else if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      value,
      { new: true }
    );

    if (board === null) {
      return res.status(404).send({ message: HttpError(404).message });
    }

    return res.status(200).send({ data: board });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default updateBoard;
