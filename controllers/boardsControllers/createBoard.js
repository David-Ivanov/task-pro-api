import HttpError from "../../helpers/HttpError.js";
import Board from "../../models/boardsModel.js";
import { createBoardSchema } from "../../schemas/boardsSchemas.js";

const createBoard = async (req, res) => {
  const { title, background, icon } = req.body;
  const { error, value } = createBoardSchema.validate({ title });

  if (error) {
    console.log(error);
    return res.status(400).send({ message: HttpError(400).message });
  }

  try {
    const board = await Board.create({
      title,
      background,
      icon,
      owner: req.user._id,
    });

    res.status(201).send({ data: board });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: HttpError(400).message }); //fix
  }
};

export default createBoard;
