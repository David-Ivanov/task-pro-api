import { Schema, model } from "mongoose";

const card = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      default: null,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "without"],
      default: "without",
    },
    deadline: {
      type: [Schema.Types.Mixed],
      default: null,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: [true, "Column id is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);

const Card = model("Card", card);
export default Card;
