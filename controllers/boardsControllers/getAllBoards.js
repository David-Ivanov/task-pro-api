import Board from "../../models/boardsModel.js";

const getAllBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({ owner: req.user._id });
    return res.status(200).send(boards);
  } catch (e) {
    next(e);
  }
};

export default getAllBoards;
