import Column from "../../models/columnsModel.js";
import mongoose from "mongoose";
import HttpError from "../../helpers/HttpError.js";
import { updateColumnSchema } from "../../schemas/boardsSchemas.js";

const updateColumn = async (req, res) => {
  const { error, value } = updateColumnSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  } else if (!mongoose.Types.ObjectId.isValid(req.params.columnId)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const column = await Column.findOneAndUpdate(
      { _id: req.params.columnId },
      value,
      { new: true }
    );

    if (column === null) {
      return res.status(404).send({ message: HttpError(404).message });
    }

    return res.status(200).send({ column });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default updateColumn;
