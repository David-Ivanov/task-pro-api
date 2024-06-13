import { Schema, model } from "mongoose";

const board = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    background: {
      type: String || null,
      default: null,
      // додати вичерпний перелік значень імен фонів, котрі можна передати.
      // в default записати значення стандартного фону
    },
    icon: {
      type: String,
      default: null,
      // додати вичерпний перелік значень імен іконок, котрі можна передати
      // в default записати значення стандартної іконки
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);

const Board = model("Board", board);
export default Board;
