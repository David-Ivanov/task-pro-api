import HttpError from "../../helpers/HttpError.js";
import mongoose from "mongoose";
import Column from "../../models/columnsModel.js";
import { columnSchema } from "../../schemas/boardsSchemas.js";

const createColumn = async (req, res) => {
  const { error, value } = columnSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  } else if (!mongoose.Types.ObjectId.isValid(value.boardId)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const column = await Column.create({
      title: value.title,
      boardId: value.boardId,
    });

    return res.status(201).send({ data: column });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default createColumn;
