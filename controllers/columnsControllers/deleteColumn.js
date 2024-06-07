import mongoose from "mongoose";
import HttpError from "../../helpers/HttpError.js";
import Column from "../../models/columnsModel.js";

const deleteColumn = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.columnId)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const column = await Column.findOneAndDelete({
      _id: req.params.columnId,
    });

    if (column === null) {
      return res.status(404).send({ message: HttpError(404).message });
    }

    return res.status(200).send({ data: column });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default deleteColumn;
