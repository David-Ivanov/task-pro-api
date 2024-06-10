import mongoose from "mongoose";
import Column from "../../models/columnsModel.js";
import HttpError from "../../helpers/HttpError.js";

const getAllColumns = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    return res.status(404).send({ message: HttpError(404).message });
  }

  try {
    const columns = await Column.find({ owner: req.user._id });
    return res.status(200).send({ columns });
  } catch (e) {
    return res.status(500).send({ message: HttpError(500, e.message).message });
  }
};

export default getAllColumns;
