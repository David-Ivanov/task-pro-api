import { Schema, model } from "mongoose";

const column = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);

const Column = model("Column", column);
export default Column;
