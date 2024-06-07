import mongoose from "mongoose";
import Column from "../../models/columnsModel.js";
import HttpError from "../../helpers/HttpError.js";

const getAllColumns = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.boardId)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const columns = await Column.find({ boardId: req.params.boardId });
    return res.status(200).send({ data: columns });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default getAllColumns;
