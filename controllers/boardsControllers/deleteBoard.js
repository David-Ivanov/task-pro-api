import mongoose from "mongoose";
import HttpError from "../../helpers/HttpError.js";
import Board from "../../models/boardsModel.js";
import { deleteBoardData } from "../../helpers/boardHelpers.js";

const deleteBoard = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (board === null) {
      return res.status(404).send({ message: HttpError(404).message });
    }

    deleteBoardData(req.params.id);

    return res.status(200).send({ data: board });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default deleteBoard;
