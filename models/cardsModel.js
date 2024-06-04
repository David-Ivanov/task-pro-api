import { Schema, model } from 'mongoose';

const board = new Schema(
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
            type: Date,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'column',
        },
    },
    { versionKey: false }
);

const Board = model('contact', board);
export default Board;