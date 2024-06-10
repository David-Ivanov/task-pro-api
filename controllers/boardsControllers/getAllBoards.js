import Board from "../../models/boardsModel.js";
import HttpError from "../../helpers/HttpError.js";

const getAllBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({ owner: req.user._id });
    return res.status(200).send({ boards });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default getAllBoards;
