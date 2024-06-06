import { Schema, model } from "mongoose";

const board = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    background: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Board = model("Board", board);
export default Board;
